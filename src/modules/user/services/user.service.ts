import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { SignUpDto, signupSchema } from 'src/modules/auth/dto/sign-up.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByIdAndThrowError(userId: number, options?: FindOneOptions<User>) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      ...options,
    });
    if (!user) throw new BadRequestException('User does not exist');
    return user;
  }

  async findByEmail(email: string, options?: FindOneOptions<User>) {
    const user = await this.userRepository.findOne({
      where: { email },
      ...options,
    });
    return user;
  }

  // async updateUser(userId: number, input: Partial<User>) {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     ...options,
  //   });
  //   if (!user) throw new BadRequestException('User does not exist');
  //   return await this.userRepository.update(user, { ...input });
  // }

  async updateLastLogin(user: User) {
    if (!user) throw new BadRequestException('User not provided');
    return await this.userRepository.update(user, {
      last_login_at: new Date(),
    });
  }

  async findByEmailAndThrowError(
    email: string,
    options?: FindOneOptions<User>,
  ) {
    const user = await this.userRepository.findOne({
      where: { email },
      ...options,
    });
    if (!user) throw new BadRequestException('User does not exist');
    return user;
  }

  async create(input: SignUpDto) {
    const { error } = signupSchema.validate(input);
    if (error) if (error.message) throw new BadRequestException(error.message);
    try {
      let user = this.userRepository.create({ ...input });
      // Todo: Save
      user = await this.userRepository.save({ ...input });
      delete user.password;
      this.logger.log('User created successfully', { ...input });
      return user;
    } catch (error) {
      this.logger.error('Error creating user: ', JSON.stringify(error));
      throw error;
    }
  }
}
