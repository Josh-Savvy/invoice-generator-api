import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignupValidationPipe } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin() {
    return await this.authService.signin();
  }

  @Post('/signup')
  async signup(@Body(new SignupValidationPipe()) input: SignUpDto) {
    return await this.authService.signup(input);
  }

  @Get()
  async profile() {
    return await this.authService.profile();
  }
}
