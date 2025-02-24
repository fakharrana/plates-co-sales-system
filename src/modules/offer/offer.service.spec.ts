import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { mockOfferRepository } from 'src/__mocks__/offer.mock';
import { OfferService } from './offer.service';
import { Offer } from './offer.model';
import { Environment } from 'src/common/enums/environment.enum';

describe('OfferService', () => {
  let service: OfferService;
  let offerRepository: typeof Offer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferService,
        { provide: getModelToken(Offer), useValue: mockOfferRepository },
      ],
    }).compile();

    service = module.get<OfferService>(OfferService);
    offerRepository = module.get<typeof Offer>(getModelToken(Offer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllOffers', () => {
    it('should return all offers', async () => {
      const mockOffers = [{ id: 1, productCode: 'R01', type: 'BOGO' }];
      (offerRepository.findAll as jest.Mock).mockResolvedValue(mockOffers);

      const result = await service.getAllOffers();

      expect(result).toEqual(mockOffers);
      expect(offerRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if no offers are found', async () => {
      (offerRepository.findAll as jest.Mock).mockResolvedValue([]);

      await expect(service.getAllOffers()).rejects.toThrow(NotFoundException);
    });
  });

  describe('addOffer', () => {
    it('should add a new offer', async () => {
      const offerData = { productCode: 'B01', type: 'BOGO' };
      const createdOffer = { id: 2, ...offerData };
      (offerRepository.create as jest.Mock).mockResolvedValue(createdOffer);

      const result = await service.addOffer(offerData);

      expect(result).toEqual(createdOffer);
      expect(offerRepository.create).toHaveBeenCalledWith(offerData);
    });
  });

  describe('clearOffers', () => {
    it('should clear all offers', async () => {
      (offerRepository.destroy as jest.Mock).mockResolvedValue(undefined);

      await service.clearOffers();

      expect(offerRepository.destroy).toHaveBeenCalledWith({ where: {} });
      if (process.env.NODE_ENV === Environment.Development) {
        expect(offerRepository.sequelize?.query).toHaveBeenCalledWith(
          'DELETE FROM sqlite_sequence WHERE name = "Offers"',
        );
      }
    });
  });
});
