import {
  ApiAcceptedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Post, Get, Body, Delete, HttpCode } from '@nestjs/common';
import { BasketService } from './basket.service';
import {
  AddToBasketDto,
  BasketResponseDto,
  BasketTotalResponseDto,
} from './dtos';

@ApiTags('Baskets')
@Controller('baskets')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({
    summary: 'Get the basket',
  })
  @ApiAcceptedResponse({ type: [BasketResponseDto] })
  @Get()
  getBasket() {
    return this.basketService.getBasket();
  }

  @ApiOperation({
    summary: 'Add a product to the basket',
  })
  @ApiAcceptedResponse({ type: [BasketResponseDto] })
  @Post()
  addToBasket(@Body() addToBasketDto: AddToBasketDto) {
    return this.basketService.addToBasket(addToBasketDto.productCode);
  }

  @ApiOperation({
    summary: 'Get total price of the basket',
  })
  @ApiAcceptedResponse({ type: [BasketTotalResponseDto] })
  @Get('total')
  getTotal() {
    return this.basketService.getBasketTotal();
  }

  @ApiOperation({
    summary: 'Clear the basket',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully cleared the basket',
  })
  @HttpCode(200)
  @Delete()
  clearBasket() {
    return this.basketService.clearBasket();
  }
}
