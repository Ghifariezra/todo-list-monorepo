import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  testData(): string {
    const data = {
      name: 'John',
      age: 30
    }
   return JSON.stringify(data);
  }
}
