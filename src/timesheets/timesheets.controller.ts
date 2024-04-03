import { Controller, Post, Body, Patch, UseGuards, HttpCode, HttpStatus, SerializeOptions } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { CreateOrUpdateTimesheetDto } from './dto/create-or-update-timesheet.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { ApiBearerAuth, ApiParam, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { TimesheetEntity } from './entities/timesheet.entity';
@ApiTags('Timesheets')
@Controller({
  path: 'timesheets',
  version: '1',
})
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('checkin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TimesheetEntity })
  create(@Body() { employeeId, currentTime }: CreateOrUpdateTimesheetDto): Promise<TimesheetEntity> {
    return this.timesheetsService.create(employeeId, currentTime);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('checkout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TimesheetEntity })
  update(@Body() { employeeId, currentTime }: CreateOrUpdateTimesheetDto): Promise<TimesheetEntity> {
    return this.timesheetsService.update(employeeId, currentTime);
  }
}
