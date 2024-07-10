import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import Client from '../user/entities/client.entity';
import { UserService } from '../user/services/user.service';

@Injectable()
export default class InvoiceService {
  private readonly logger: Logger = new Logger(InvoiceService.name);
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, input: CreateInvoiceDto) {
    if (isNaN(userId)) throw new BadRequestException('Invalid userId');
    const user = await this.userService.findByIdAndThrowError(userId);
    try {
      const client = new Client({ ...input.client, isUser: false });
      // Todo: check whether client is a user
      if (true) client.isUser = true;
      const newInvoice = this.invoiceRepository.create({
        ...input,
        client,
        created_by_id: user.id,
      });
      // await this.invoiceRepository.save(newInvoice);
      return newInvoice;
    } catch (error) {
      const stack = new Error();
      this.logger.error(error, stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
