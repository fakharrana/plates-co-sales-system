import { ApiProperty } from '@nestjs/swagger';
import { CreateOfferRequestDto } from './create-offer-request.dto';

export class OfferResponseDto extends CreateOfferRequestDto {
  @ApiProperty({
    description: 'Unique identifier of the offer',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The date and time when the offer was created',
    example: '2024-02-23T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the offer was last updated',
    example: '2024-02-23T12:00:00Z',
  })
  updatedAt: Date;
}
