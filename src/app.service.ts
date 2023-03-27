import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }

  sayHello(): string {
    return 'Hello EveryBody';
  }

  getHi(): string {
    return 'Hi';
  }
}
