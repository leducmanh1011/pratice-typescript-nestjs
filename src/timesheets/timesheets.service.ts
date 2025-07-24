import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { TimesheetEntity } from './entities/timesheet.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class TimesheetsService {
  constructor(private prisma: PrismaService) {}

  async create(employeeId: number, currentTimeStr: string): Promise<TimesheetEntity> {
    const employee = await this.prisma.employee.findFirstOrThrow({
      where: {
        id: employeeId,
      },
    });

    const timesheet = await this.findOne(employee.id, currentTimeStr);

    if (timesheet) return timesheet;

    return await this.prisma.timesheet.create({
      data: {
        employee: {
          connect: { id: employee.id },
        },
      },
    });
  }

  async findOne(employeeId: number, currentTimeStr: string) {
    const [beginningOfTheDay, endOfTheDay] = [new Date(currentTimeStr), new Date(currentTimeStr)];
    beginningOfTheDay.setHours(0, 0, 0, 0);
    endOfTheDay.setHours(23, 59, 59, 999);

    return await this.prisma.timesheet.findFirst({
      where: {
        employeeId,
        workingStartTime: {
          gte: beginningOfTheDay,
          lte: endOfTheDay,
        },
      },
      include: {
        employee: true,
      },
    });
  }

  async update(employeeId: number, currentTimeStr: string) {
    const employee = await this.prisma.employee.findFirstOrThrow({
      where: {
        id: employeeId,
      },
    });

    const timesheet = await this.findOne(employee.id, currentTimeStr);

    return await this.prisma.timesheet.update({
      where: {
        id: timesheet.id,
      },
      data: {
        workingEndTime: new Date(currentTimeStr),
      },
    });
  }
}
