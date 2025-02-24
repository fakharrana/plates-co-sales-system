import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from '../basket/basket.model';
import { Offer } from './offer.model';
import { Environment } from 'src/common/enums/environment.enum';

@Injectable()
export class OfferService {
  constructor(@InjectModel(Offer) private offerRepository: typeof Offer) {}

  async getAllOffers(): Promise<Offer[]> {
    const offers = await this.offerRepository.findAll();

    if (!offers?.length) {
      throw new NotFoundException('No offers found');
    }

    return offers;
  }

  private applyOffer(item: Basket, offer: Offer, subtotal: number): number {
    if (!item.product || item.product.price === undefined) return subtotal;

    if (offer.type === 'BOGO' && item.quantity >= offer.minQuantity) {
      const discountCount = Math.floor(item.quantity / 2);
      const discount =
        discountCount *
        (item.product!.price * (offer.discountPercentage / 100));
      subtotal -= discount;
    }
    return subtotal;
  }

  async applyOffers(basketItems: Basket[]): Promise<number> {
    const offers = await this.getAllOffers();
    const offerMap = new Map(offers.map((offer) => [offer.productCode, offer]));

    let subtotal = basketItems.reduce((sum, item) => {
      return sum + (item.product?.price ?? 0) * item.quantity;
    }, 0);

    basketItems.forEach((item) => {
      const offer = item.product ? offerMap.get(item.product.code) : undefined;
      if (offer) {
        subtotal = this.applyOffer(item, offer, subtotal);
      }
    });

    return subtotal;
  }

  async addOffer(offerData: Partial<Offer>): Promise<Offer> {
    const existingOffer = await this.offerRepository.findOne({
      where: {
        productCode: offerData.productCode,
        type: offerData.type,
        discountPercentage: offerData.discountPercentage,
        minQuantity: offerData.minQuantity,
      },
    });

    if (existingOffer) {
      throw new ConflictException('Offer already exists');
    }

    return this.offerRepository.create(offerData);
  }

  async clearOffers(): Promise<void> {
    await this.offerRepository.destroy({ where: {} });

    if (process.env.NODE_ENV === Environment.Development) {
      await this.offerRepository.sequelize?.query(
        'DELETE FROM sqlite_sequence WHERE name = "Offers"',
      );
    }
  }
}
