import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import helpers from 'src/helpers';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly userService: UserService) {}

  async signin() {
    return {};
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
