import { ApiProperty } from '@nestjs/swagger';

export class BasketTotalResponseDto {
  @ApiProperty({
    example: 98.27,
    description:
      'Total cost of the basket including offers and delivery charges',
  })
  total: number;
}
