import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { QueryPaymentDto } from '../dto/query-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { PaymentByIdPipe } from '../../pipes/payment-by-id.pipe';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentWithCategoriesResponse } from '../responses/payment-with-categories.response';
import { PaymentWithBalanceResponse } from '../responses/payment-with-balance.response';

@ApiTags('Payments')
@Controller({
  version: '1',
  path: '/payments',
})
export class PaymentController {
  constructor (
    private paymentService: PaymentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment' })
  @ApiOkResponse({ type: PaymentWithCategoriesResponse })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Amount cannot be empty
      Type cannot be empty
      Type must be an enum
      Description cannot be empty
      Category id cannot be empty`,
  })
  async create (
    @Body() body: CreatePaymentDto,
  ) {
    return this.paymentService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments with balance' })
  @ApiOkResponse({ type: PaymentWithBalanceResponse })
  async getPayments (
    @Query() query: QueryPaymentDto,
  ) {
    return this.paymentService.getPayments(query);
  }

  @Patch('/:paymentId')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiOkResponse({ type: PaymentWithCategoriesResponse })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Payment with such id is not found
      Category with such id is not found
      
    InvalidBodyException:
      Type must be an enum
      
    InsufficientBalanceException:
      Insufficient balance`,
  })
  async update (
    @Body() body: UpdatePaymentDto,
    @Param('paymentId', PaymentByIdPipe) paymentId: string,
  ) {
    return this.paymentService.update(paymentId, body);
  }

  @Delete('/:paymentId')
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiOkResponse({ type: PaymentWithCategoriesResponse })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Payment with such id is not found
      
    InsufficientBalanceException:
      Insufficient balance`,
  })
  async delete (
    @Param('paymentId', PaymentByIdPipe) paymentId: string,
  ) {
    return this.paymentService.delete(paymentId);
  }
}
