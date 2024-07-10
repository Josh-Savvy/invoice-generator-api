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
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from 'src/config/jwt.config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<JwtConfig>,
  ) {}

  async signin(input: SignInDto) {
    // Todo: implement caching strategy
    try {
      const user = await this.userService.findByEmail(input.email, {
        relations: ['business'],
      });
      if (!user) throw new BadRequestException('Invalid Credentials');
      if (!helpers.password.isValidPassword(user.password, input.password))
        throw new BadRequestException('Invalid Credentials');
      const access_token = this.jwtService.sign(
        { sub: user.id, email: user.email },
        { secret: this.configService.get('secret') },
      );
      await this.userService.updateLastLogin(user);
      delete user.password;
      user.last_login_at = new Date();
      return { user, access_token };
    } catch (error) {
      this.logger.error(`Error logging in: ${error}`);
      console.log({ error });
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  async signup(input: SignUpDto) {
    try {
      input.password = await helpers.password.encryptPassword(input.password);
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
}
