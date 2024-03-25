import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrUpdateTimesheetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  currentTime: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  employeeId: number;
}
