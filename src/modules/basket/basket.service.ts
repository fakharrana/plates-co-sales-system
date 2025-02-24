import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './basket.model';
import { OfferService } from 'src/modules/offer/offer.service';
import { DeliveryService } from 'src/modules/delivery/delivery.service';
import { Environment } from 'src/common/enums/environment.enum';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';
import { BasketTotalResponseDto } from './dtos/basket-total-response.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private basketRepository: typeof Basket,
    private readonly productService: ProductService,
    private readonly offerService: OfferService,
    private readonly deliveryService: DeliveryService,
  ) {}

  async getBasket(): Promise<Basket[]> {
    return this.basketRepository.findAll({
      include: Product,
    });
  }

  async addToBasket(productCode: string): Promise<Basket> {
    await this.productService.getProductByCode(productCode);
    const item = await this.basketRepository.findOne({
      where: { productCode },
    });

    if (item) {
      item.quantity++;
      return await item.save();
    } else {
      return await this.basketRepository.create({ productCode, quantity: 1 });
    }
  }

  async getBasketTotal(): Promise<BasketTotalResponseDto> {
    const basketItems = await this.getBasket();
    const subtotal = await this.offerService.applyOffers(basketItems);
    const delivery = this.deliveryService.calculateCharge(subtotal);
    const total = Math.floor((subtotal + delivery) * 100) / 100;
    return { total };
  }

  async clearBasket(): Promise<void> {
    await this.basketRepository.destroy({ where: {} });

    if (process.env.NODE_ENV === Environment.Development) {
      await this.basketRepository.sequelize?.query(
        'DELETE FROM sqlite_sequence WHERE name = "Baskets"',
      );
    }
  }
}
