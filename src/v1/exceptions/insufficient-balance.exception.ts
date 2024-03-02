import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientBalanceException extends HttpException {
  constructor () {
    super('Insufficient balance', HttpStatus.BAD_REQUEST);
  }
}
