import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(userId: number, options?: FindOneOptions<User>) {
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
    if (!user) throw new BadRequestException('User does not exist');
    return user;
  }

  create(input: CreateUserDto) {
    const user = this.userRepository.create({ ...input });
    // Todo: Save
    return user;
  }
}
