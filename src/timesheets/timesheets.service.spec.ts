import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetsService } from './timesheets.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreateOrUpdateTimesheetDto } from './dto/create-or-update-timesheet.dto';
import { NotFoundException } from '@nestjs/common';

describe('TimesheetsService', () => {
  let timesheetService: TimesheetsService;
  let prismaService: PrismaService;

  const mockPrismaSerive = {
    timesheet: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    employee: {
      findFirstOrThrow: jest.fn(),
    },
  };

  const employee = {
    id: 1,
  };

  const timesheet = {
    id: 1,
    employeeId: 1,
    workingStartTime: '2024-03-26T03:04:30.547Z',
    workingEndTime: '2024-03-26T03:05:30.547Z',
  };

  const createUserDto = {
    currentTime: '2024-03-26T02:55:30.652Z',
    employeeId: -1,
  } as CreateOrUpdateTimesheetDto;

  const updateUserDto = {
    currentTime: '2024-03-26T02:55:30.652Z',
    employeeId: 1,
  } as CreateOrUpdateTimesheetDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimesheetsService,
        {
          provide: PrismaService,
          useValue: mockPrismaSerive,
        },
      ],
    }).compile();

    timesheetService = module.get<TimesheetsService>(TimesheetsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(timesheetService).toBeDefined();
  });

  describe('Checkin', () => {
    it('should checkin success and return timesheet', async () => {
      mockPrismaSerive.timesheet.findFirst.mockResolvedValueOnce(null);
      mockPrismaSerive.timesheet.create.mockResolvedValueOnce(timesheet);
      mockPrismaSerive.employee.findFirstOrThrow.mockResolvedValueOnce(employee);

      const result = await timesheetService.create(createUserDto.employeeId, createUserDto.currentTime);

      expect(result).toEqual(timesheet);
    });

    it('should checkin success and return timesheet created if timesheet exist', async () => {
      mockPrismaSerive.employee.findFirstOrThrow.mockResolvedValueOnce(employee);
      mockPrismaSerive.timesheet.findFirst.mockResolvedValueOnce(timesheet);

      const result = await timesheetService.create(createUserDto.employeeId, createUserDto.currentTime);

      expect(result).toEqual(timesheet);
    });

    it('should throw Notfound error if employee not exist', async () => {
      mockPrismaSerive.employee.findFirstOrThrow.mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(timesheetService.create(createUserDto.employeeId, createUserDto.currentTime)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('Checkout', () => {
    it('should checkout success and return timesheet', async () => {
      mockPrismaSerive.employee.findFirstOrThrow.mockResolvedValueOnce(employee);
      mockPrismaSerive.timesheet.findFirst.mockResolvedValueOnce(timesheet);
      mockPrismaSerive.timesheet.update.mockResolvedValueOnce(timesheet);

      const result = await timesheetService.create(updateUserDto.employeeId, updateUserDto.currentTime);

      expect(result).toEqual(timesheet);
    });
  });

  it('should throw Notfound error if employee not exist', async () => {
    mockPrismaSerive.employee.findFirstOrThrow.mockImplementation(() => {
      throw new NotFoundException();
    });

    await expect(timesheetService.create(updateUserDto.employeeId, updateUserDto.currentTime)).rejects.toThrowError(
      NotFoundException,
    );
  });
});
