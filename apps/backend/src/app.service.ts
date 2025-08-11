import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getCheck(): { name: string; email: string; password: string } {
    const data = {
      name: 'John Doe',
      email: 'bLxkP@example.com',
      password: '123456',
    };
    return data;
  }
}
