import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { Basket } from './basket.model';
import { ProductModule } from 'src/modules/product/product.module';
import { DeliveryModule } from 'src/modules/delivery/delivery.module';
import { OfferModule } from '../offer/offer.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Basket]),
    ProductModule,
    OfferModule,
    DeliveryModule,
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
