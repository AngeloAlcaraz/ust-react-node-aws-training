import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from '../../common/decorator/decorator.auth_user';
import { AccessTokenGuard } from '../../common/gaurds/gaurd.access_token';
import { RefreshTokenGuard } from '../../common/gaurds/gaurd.refresh_token';
import { AuthDto } from '../dtos/auth.dto';
import { CreateUserDto } from '../../users/dtos/create_user.dto';
import { AuthService } from '../service/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    console.log('AuthController initialized');
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    console.log('Signup payload:', createUserDto);
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@AuthUser('sub') sub: string) {
    return this.authService.logout(sub);
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @AuthUser('sub') sub: string,
    @AuthUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(sub, refreshToken);
  }
}
