import { ApiProperty } from '@nestjs/swagger';
import { CreateProductRequestDto } from './create-product-request.dto';

export class ProductResponseDto extends CreateProductRequestDto {
  @ApiProperty({
    description: 'Unique identifier of the product',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The date and time when the product was created',
    example: '2024-02-23T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the product was last updated',
    example: '2024-02-23T12:00:00Z',
  })
  updatedAt: Date;
}
