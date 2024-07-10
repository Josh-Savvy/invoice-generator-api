import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Business from './entities/business.entity';
import { UserService } from './services/user.service';
import { BusinessController } from './controllers/business.controller';
import BusinessService from './services/business.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Business])],
  controllers: [BusinessController],
  providers: [UserService, BusinessService],
  exports: [UserService],
})
export class UserModule {}
