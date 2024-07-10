import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import InvoiceService from './invoice.service';
import {
  CreateInvoiceDto,
  CreateInvoiceValidationPipe,
} from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @UsePipes(new CreateInvoiceValidationPipe())
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    const userId = 1;
    return await this.invoiceService.create(userId, createInvoiceDto);
  }
}
