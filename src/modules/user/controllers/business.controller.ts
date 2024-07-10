import { Controller, Post, Body } from '@nestjs/common';
import BusinessService from '../services/business.service';
import CreateBusinessDTO from '../dto/create-business.dto';

@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  async create(@Body() input: CreateBusinessDTO) {
    return await this.businessService.create(input);
  }
}
