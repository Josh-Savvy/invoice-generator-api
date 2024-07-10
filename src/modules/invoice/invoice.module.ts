import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import InvoiceService from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User])],
  controllers: [InvoiceController],
  providers: [InvoiceService, UserService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
