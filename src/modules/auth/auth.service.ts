import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { SignUpDto, SignInDto } from './dto/sign-up.dto';
import helpers from 'src/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(input: SignInDto) {
    const access_token = this.jwtService.sign({ sub: Date.now() });
    const user = input;
    return { user, access_token };
  }

  async signup(input: SignUpDto) {
    try {
      input.password = await helpers().password.encryptPassword(input.password);
      return await this.userService.create(input);
    } catch (error) {
      const stack = new Error();
      this.logger.error(error, stack);
      if (error.code == '23505')
        throw new BadRequestException(
          'Sorry, this email has already been used.',
        );
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async profile() {
    return {};
  }
}
