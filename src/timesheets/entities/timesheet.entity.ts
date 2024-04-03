import { ApiProperty } from '@nestjs/swagger';
import { Timesheet, TimesheetStatus } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class TimesheetEntity implements Timesheet {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Expose({ groups: ['me', 'admin'] })
  employeeId: number;

  @ApiProperty()
  @Expose({ groups: ['me', 'admin'] })
  workingStartTime: Date;

  @ApiProperty()
  @Expose({ groups: ['me', 'admin'] })
  workingEndTime: Date;

  @ApiProperty()
  @Expose({ groups: ['me', 'admin'] })
  status: TimesheetStatus;

  @ApiProperty()
  @Expose({ groups: ['me', 'admin'] })
  approvedById: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
