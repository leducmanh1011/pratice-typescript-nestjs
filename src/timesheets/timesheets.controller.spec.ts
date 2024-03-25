import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetsController } from './timesheets.controller';
import { TimesheetsService } from './timesheets.service';
import { PrismaService } from './../prisma/prisma.service';

describe('TimesheetsController', () => {
  let controller: TimesheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetsController],
      providers: [TimesheetsService, PrismaService],
    }).compile();

    controller = module.get<TimesheetsController>(TimesheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
