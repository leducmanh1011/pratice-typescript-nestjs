import { ApiProperty } from '@nestjs/swagger';
import { User, Role, UserStatus } from '@prisma/client';
export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  status: UserStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  encryptedPassword: string;
}
