import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOfferRequestDto {
  @ApiProperty({
    description: 'The product code to which the offer applies',
    example: 'R01',
  })
  @IsString()
  productCode: string;

  @ApiProperty({
    description: 'The type of offer',
    example: 'BOGO',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The percentage of discount',
    example: 50,
  })
  @IsNumber()
  discountPercentage: number;

  @ApiProperty({
    description: 'The minimum quantity of same product to apply the offer',
    example: 2,
  })
  @IsNumber()
  minQuantity: number;

  @ApiProperty({
    description: 'The description of the offer',
    example: 'Any description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Shows whether the offer is active or not',
    example: true,
  })
  @IsString()
  isActive: boolean;
}
