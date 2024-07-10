import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin() {
    return await this.authService.signin();
  }

  @Post('/signup')
  async signup() {
    return await this.authService.signup();
  }

  @Get()
  async profile() {
    return await this.authService.profile();
  }
}
