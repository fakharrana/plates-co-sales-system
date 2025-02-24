import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryService],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateCharge', () => {
    it('should return 0 for subtotal >= 90', () => {
      expect(service.calculateCharge(90)).toBe(0);
      expect(service.calculateCharge(100)).toBe(0);
    });

    it('should return 2.95 for subtotal >= 50 and < 90', () => {
      expect(service.calculateCharge(50)).toBe(2.95);
      expect(service.calculateCharge(89.99)).toBe(2.95);
    });

    it('should return 4.95 for subtotal < 50', () => {
      expect(service.calculateCharge(49.99)).toBe(4.95);
      expect(service.calculateCharge(10)).toBe(4.95);
    });
  });
});
