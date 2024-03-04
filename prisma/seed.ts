import { PrismaClient, MLocation, MArea, Gender, Holiday, Company, CompanyPlan, Employee } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.mLocation.deleteMany({});
  await prisma.companyPlan.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.user.deleteMany({});

  type MAreaType = Pick<MArea, 'name'>;
  type MLocationType = Pick<MLocation, 'name'> & { mAreas: { create: MAreaType[] } };
  type CompanyPlanType = Pick<CompanyPlan, 'name' | 'maxUser' | 'description'>;
  type CompanyType = Pick<Company, 'name' | 'companyPlanId' | 'mLocationId' | 'mAreaId'>;
  type IdRecord = {
    id: number;
  };

  type User = {
    email: string;
    encryptedPassword: string;
  };
  type EmployeeType = Pick<
    Employee,
    'userId' | 'companyId' | 'code' | 'firstName' | 'lastName' | 'dateOfBirth' | 'gender' | 'address' | 'phoneNumber'
  >;

  function getRandomId(items: IdRecord[]): number {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex].id;
  }

  const companyPlanData: CompanyPlanType[] = [
    {
      name: 'FREE',
      maxUser: 50,
      description: 'Free Plan.',
    },
    {
      name: 'PREMIUM',
      maxUser: 500,
      description: 'Premium Plan.',
    },
  ];

  await prisma.companyPlan.createMany({ data: companyPlanData });

  for (let i = 1; i <= 10; i++) {
    const locationMAreas: MAreaType[] = [];

    for (let i = 1; i <= 10; i++) {
      const mArea: MAreaType = {
        name: faker.location.city(),
      };

      locationMAreas.push(mArea);
    }

    const mLocationData: MLocationType = {
      name: faker.location.country(),
      mAreas: {
        create: locationMAreas,
      },
    };

    const mLocation = await prisma.mLocation.create({ data: mLocationData });
    const companyPlans = await prisma.companyPlan.findMany({ select: { id: true } });
    const mAreas = await prisma.mArea.findMany({ where: { mLocationId: mLocation.id }, select: { id: true } });

    const companyData: CompanyType = {
      name: faker.company.name(),
      mLocationId: mLocation.id,
      companyPlanId: getRandomId(companyPlans),
      mAreaId: getRandomId(mAreas),
    };

    const company = await prisma.company.create({ data: companyData });

    const holidayData: Pick<Holiday, 'companyId' | 'date'>[] = [
      {
        companyId: company.id,
        date: new Date('2024-03-08'),
      },
      {
        companyId: company.id,
        date: new Date('2024-04-30'),
      },
      {
        companyId: company.id,
        date: new Date('2024-05-01'),
      },
      {
        companyId: company.id,
        date: new Date('2024-09-02'),
      },
    ];
    await prisma.holiday.createMany({ data: holidayData });

    const encryptedPassword: string = await bcrypt.hash('Aa@123456', 12);

    for (let i = 1; i <= 10; i++) {
      const sex = faker.person.sexType();
      const firstName = faker.person.firstName(sex);
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      const userData: User = { email, encryptedPassword };

      const user = await prisma.user.create({ data: userData });

      const employeeData: EmployeeType = {
        userId: user.id,
        companyId: company.id,
        code: `B24-${faker.string.alpha({ length: 5, casing: 'upper' })}-${faker.string.numeric(6)}`,
        firstName,
        lastName,
        dateOfBirth: faker.date.birthdate(),
        gender: sex === 'male' ? Gender.MALE : Gender.FEMALE,
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
      };

      const employee = await prisma.employee.create({ data: employeeData });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
