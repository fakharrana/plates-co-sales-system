import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { BasketModule } from './modules/basket/basket.module';
import { Product } from './modules/product/product.model';
import { Basket } from './modules/basket/basket.model';
import { Offer } from './modules/offer/offer.model';
import { OfferModule } from './modules/offer/offer.module';
import { DeliveryModule } from './modules/delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models: [Product, Basket, Offer],
      synchronize: false,
    }),
    ProductModule,
    BasketModule,
    OfferModule,
    DeliveryModule,
  ],
})
export class AppModule {}
