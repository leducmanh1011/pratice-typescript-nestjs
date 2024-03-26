import { Module } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { TimesheetsController } from './timesheets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TimesheetsController],
  providers: [TimesheetsService],
  imports: [PrismaModule],
})
export class TimesheetsModule {}
