import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from 'src/modules/product/dtos/product-response.dto';

export class BasketResponseDto {
  @ApiProperty({
    example: 2,
    description: 'Unique identifier of the basket item',
  })
  id: number;

  @ApiProperty({
    example: 'R01',
    description: 'Product code of the item in the basket',
  })
  productCode: string;

  @ApiProperty({
    example: 3,
    description: 'Quantity of the product in the basket',
  })
  quantity: number;

  @ApiProperty({
    example: '2025-02-23T14:29:07.480Z',
    description: 'Timestamp when the basket item was created',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-02-23T14:29:16.969Z',
    description: 'Timestamp when the basket item was last updated',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Product details of the item in the basket',
    type: ProductResponseDto,
  })
  product: ProductResponseDto;
}
