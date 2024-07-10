/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceItem } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import Client from '../user/entities/client.entity';
import { isPast, parse } from 'date-fns';
import helpers from 'src/helpers';
import { CURRENCIES } from 'src/constants';
import { faker } from '@faker-js/faker';
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
    const { due_date } = input;
    let { items } = input;
    if (isNaN(userId)) throw new BadRequestException('Invalid userId');
    const date = parse(due_date, 'dd-MM-yyyy', new Date());
    if (isPast(date))
      throw new BadRequestException('Due date cannot be in the past');
    items = items.map((item) => new InvoiceItem({ ...item } as any));
    const client = new Client({
      ...input.client,
      isUser: false,
      avatar: faker.image.avatar(),
    });
    // Todo: check whether client is a user
    const clientIsUser = await this.userService.findByEmail(client.email);
    if (clientIsUser) {
      client.isUser = true;
      client.avatar = clientIsUser.avatar;
      client.first_name = clientIsUser.first_name;
      client.last_name = clientIsUser.last_name;
    }

    try {
      const currency = CURRENCIES.find((c) => c.iso === input.currency);
      const newInvoice = this.invoiceRepository.create({
        ...input,
        reference: helpers.invoice.generateInvoiceRef(),
        created_by_id: userId,
        currency,
        due_date: date,
        client,
      });
      await this.invoiceRepository.save(newInvoice);
      return newInvoice;
    } catch (error) {
      const stack = new Error();
      this.logger.error(error, stack);
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  // Todo: query filter
  async fetchUserInvoices(
    userId: number,
    filter?: { skip?: number; limit?: number },
  ) {
    const { limit = 10, skip = 0 } = filter || {};
    return await this.invoiceRepository.find({
      where: { created_by_id: userId },
      skip,
      take: limit,
    });
  }
}
