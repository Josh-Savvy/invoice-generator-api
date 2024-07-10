import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpDto,
  SignupValidationPipe,
  SigninValidationPipe,
  SignInDto,
} from './dto/sign-up.dto';
import { AuthGuard, type JwtUser } from './guards/auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UsePipes(new SigninValidationPipe())
  async signin(@Body() input: SignInDto) {
    return await this.authService.signin(input);
  }

  @Post('/signup')
  async signup(@Body(new SignupValidationPipe()) input: SignUpDto) {
    return await this.authService.signup(input);
  }

  @UseGuards(AuthGuard)
  @Get()
  async profile(@Req() req: Request & { user: JwtUser }) {
    return req?.user;
  }
}
