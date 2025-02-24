import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { mockBasketRepository } from 'src/__mocks__/basket.mock';
import { mockDeliveryService } from 'src/__mocks__/delivery.mock';
import { mockProductRepository } from 'src/__mocks__/product.mock';
import { mockOfferService } from 'src/__mocks__/offer.mock';
import { BasketService } from './basket.service';
import { Basket } from './basket.model';
import { ProductService } from '../product/product.service';
import { OfferService } from '../offer/offer.service';
import { DeliveryService } from '../delivery/delivery.service';
import { Product } from '../product/product.model';
import { Environment } from 'src/common/enums/environment.enum';

describe('BasketService', () => {
  let service: BasketService;
  let basketRepository: typeof Basket;
  let productService: ProductService;
  let offerService: OfferService;
  let deliveryService: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasketService,
        { provide: getModelToken(Basket), useValue: mockBasketRepository },
        { provide: ProductService, useValue: mockProductRepository },
        { provide: OfferService, useValue: mockOfferService },
        { provide: DeliveryService, useValue: mockDeliveryService },
      ],
    }).compile();

    service = module.get<BasketService>(BasketService);
    basketRepository = module.get<typeof Basket>(getModelToken(Basket));
    productService = module.get<ProductService>(ProductService);
    offerService = module.get<OfferService>(OfferService);
    deliveryService = module.get<DeliveryService>(DeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBasket', () => {
    it('should return an array of basket items', async () => {
      const mockBasket = [{ id: 1, productCode: 'P001', quantity: 2 }];
      basketRepository.findAll = jest.fn().mockResolvedValue(mockBasket);

      const result = await service.getBasket();

      expect(result).toEqual(mockBasket);
      expect(basketRepository.findAll).toHaveBeenCalledWith({
        include: Product,
      });
    });
  });

  describe('addToBasket', () => {
    it('should add a product to the basket', async () => {
      const productCode = 'P001';
      const mockBasket = {
        id: 1,
        productCode,
        quantity: 1,
        increment: jest.fn(),
      };

      productService.getProductByCode = jest.fn().mockResolvedValue({});
      basketRepository.findOne = jest.fn().mockResolvedValue(null);
      basketRepository.create = jest.fn().mockResolvedValue(mockBasket);

      const result = await service.addToBasket(productCode);

      expect(result).toEqual(mockBasket);
      expect(productService.getProductByCode).toHaveBeenCalledWith(productCode);
      expect(basketRepository.create).toHaveBeenCalledWith({
        productCode,
        quantity: 1,
      });
    });

    it('should increment quantity if product already in basket', async () => {
      const productCode = 'P001';
      const mockBasket = {
        id: 1,
        productCode,
        quantity: 1,
        increment: jest.fn().mockResolvedValue({ quantity: 2 }),
      };

      productService.getProductByCode = jest.fn().mockResolvedValue({});
      basketRepository.findOne = jest.fn().mockResolvedValue(mockBasket);

      const result = await service.addToBasket(productCode);

      expect(result).toEqual({ quantity: 2 });
      expect(mockBasket.increment).toHaveBeenCalledWith('quantity');
    });
  });

  describe('getBasketTotal', () => {
    it('should return the total cost of the basket', async () => {
      const mockBasket = [{ id: 1, productCode: 'P001', quantity: 2 }];
      const subtotal = 50;
      const delivery = 2.95;

      basketRepository.findAll = jest.fn().mockResolvedValue(mockBasket);
      offerService.applyOffers = jest.fn().mockResolvedValue(subtotal);
      deliveryService.calculateCharge = jest.fn().mockReturnValue(delivery);

      const result = await service.getBasketTotal();

      expect(result).toEqual({ total: 52.95 });
      expect(basketRepository.findAll).toHaveBeenCalledWith({
        include: Product,
      });
      expect(offerService.applyOffers).toHaveBeenCalledWith(mockBasket);
      expect(deliveryService.calculateCharge).toHaveBeenCalledWith(subtotal);
    });
  });

  describe('clearBasket', () => {
    it('should clear the basket', async () => {
      basketRepository.destroy = jest.fn().mockResolvedValue(undefined);
      basketRepository.sequelize.query = jest.fn().mockResolvedValue(undefined);

      await service.clearBasket();

      expect(basketRepository.destroy).toHaveBeenCalledWith({ where: {} });

      if (process.env.NODE_ENV === Environment.Development) {
        expect(basketRepository.sequelize.query).toHaveBeenCalledWith(
          'DELETE FROM sqlite_sequence WHERE name = "Baskets"',
        );
      }
    });
  });
});
