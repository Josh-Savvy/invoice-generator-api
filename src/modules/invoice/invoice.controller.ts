import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import InvoiceService from './invoice.service';
import {
  CreateInvoiceDto,
  CreateInvoiceValidationPipe,
} from './dto/create-invoice.dto';
import { AuthGuard, JwtUser } from '../auth/guards/auth.guard';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @UsePipes(new CreateInvoiceValidationPipe())
  @UseGuards(AuthGuard)
  async create(@Req() req: any, @Body() createInvoiceDto: CreateInvoiceDto) {
    const { id: userId } = req?.user as JwtUser;
    return await this.invoiceService.create(userId, createInvoiceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async fetchUserInvoices(
    @Req() req: any,
    @Query() query: { skip?: number; limit?: number },
  ) {
    const { id: userId } = req?.user as JwtUser;
    return await this.invoiceService.fetchUserInvoices(userId, { ...query });
  }
}
