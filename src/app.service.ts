import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const date = new Date();
    return {
      message: 'Server is healthy!',
      server_date: `${date.toDateString()} ${date.toTimeString()}`,
    };
  }
}
