import { Injectable } from '@nestjs/common';
import CreateBusinessDTO from '../dto/create-business.dto';

@Injectable()
export default class BusinessService {
  async create(input: CreateBusinessDTO) {
    return input;
  }
}
