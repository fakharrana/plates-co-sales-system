import {
  ApiAcceptedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferRequestDto, OfferResponseDto } from './dtos';

@ApiTags('Offers')
@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiOperation({
    summary: 'Get all offers',
  })
  @ApiAcceptedResponse({ type: [OfferResponseDto] })
  @Get()
  getAllOffers() {
    return this.offerService.getAllOffers();
  }

  @ApiOperation({
    summary: 'Add an offer',
  })
  @ApiAcceptedResponse({ type: [OfferResponseDto] })
  @Post()
  addOffer(@Body() offer: CreateOfferRequestDto) {
    return this.offerService.addOffer(offer);
  }

  @ApiOperation({
    summary: 'Clear all offers',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully cleared all offers',
  })
  @HttpCode(200)
  @Delete()
  clearOffers() {
    return this.offerService.clearOffers();
  }
}
