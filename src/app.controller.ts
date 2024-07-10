import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CURRENCIES } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/currencies')
  getCurrencies() {
    return CURRENCIES;
  }
}
