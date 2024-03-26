import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { CreateOrUpdateTimesheetDto } from './dto/create-or-update-timesheet.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';

@Controller('timesheets')
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @Post('checkin')
  @UseGuards(AccessTokenGuard)
  create(@Body() { employeeId, currentTime }: CreateOrUpdateTimesheetDto) {
    return this.timesheetsService.create(employeeId, currentTime);
  }

  @Patch('checkout')
  @UseGuards(AccessTokenGuard)
  update(@Body() { employeeId, currentTime }: CreateOrUpdateTimesheetDto) {
    return this.timesheetsService.update(employeeId, currentTime);
  }
}
