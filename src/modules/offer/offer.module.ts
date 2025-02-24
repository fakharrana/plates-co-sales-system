import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Offer } from './offer.model';
import { OfferController } from './offer.controller';

@Module({
  imports: [SequelizeModule.forFeature([Offer])],
  providers: [OfferService],
  exports: [OfferService],
  controllers: [OfferController],
})
export class OfferModule {}
