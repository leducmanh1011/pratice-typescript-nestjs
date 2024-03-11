import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from '../common/decorators/currentUser.decorator';
import { AccessTokenGuard, RefreshTokenGuard } from '../common/guards';
import { Logger } from '@nestjs/common';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  logout(@CurrentUser('id') userId: number): Promise<boolean> {
    Logger.log(userId); // Logging for debugger
    return this.authService.logout(userId);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @CurrentUser('id') userId: number,
    @CurrentUser('refreshToken') refreshToken: string,
  ): Promise<AuthEntity> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
