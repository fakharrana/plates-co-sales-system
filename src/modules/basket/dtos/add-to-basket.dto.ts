import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddToBasketDto {
  @ApiProperty({
    description: 'The code of the product to be added to the basket',
    example: 'R01',
  })
  @IsString()
  productCode: string;
}
