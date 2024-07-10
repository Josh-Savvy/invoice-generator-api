import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import InvoiceService from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), UserModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
