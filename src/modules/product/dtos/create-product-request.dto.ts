import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty({
    description: 'The product code',
    example: 'R01',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Red Plate',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 50,
  })
  @IsNumber()
  price: number;
}
