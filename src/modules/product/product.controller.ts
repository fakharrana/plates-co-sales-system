import {
  ApiAcceptedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequestDto, ProductResponseDto } from './dtos';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiAcceptedResponse({ type: [ProductResponseDto] })
  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({
    summary: 'Add a product',
  })
  @ApiAcceptedResponse({ type: [ProductResponseDto] })
  @Post()
  addProduct(@Body() product: CreateProductRequestDto) {
    return this.productService.addProduct(product);
  }

  @ApiOperation({
    summary: 'Clear all products',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully cleared all products',
  })
  @HttpCode(200)
  @Delete()
  clearProducts() {
    return this.productService.clearProducts();
  }
}
