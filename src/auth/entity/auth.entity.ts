import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  accessToken: string;
}
