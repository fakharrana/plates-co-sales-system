import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { mockProductRepository } from 'src/__mocks__/product.mock';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { Environment } from 'src/common/enums/environment.enum';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: typeof Product;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<typeof Product>(getModelToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const mockProducts = [{ id: 1, code: 'P001', name: 'Product 1' }];
      productRepository.findAll = jest.fn().mockResolvedValue(mockProducts);

      const result = await service.getAllProducts();

      expect(result).toEqual(mockProducts);
      expect(productRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if no products are found', async () => {
      productRepository.findAll = jest.fn().mockResolvedValue([]);

      await expect(service.getAllProducts()).rejects.toThrow(
        new NotFoundException('No products found'),
      );
    });
  });

  describe('getProductByCode', () => {
    it('should return a product by code', async () => {
      const mockProduct = { id: 1, code: 'P001', name: 'Product 1' };
      productRepository.findOne = jest.fn().mockResolvedValue(mockProduct);

      const result = await service.getProductByCode('P001');

      expect(result).toEqual(mockProduct);
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { code: 'P001' },
      });
    });

    it('should throw NotFoundException if product is not found', async () => {
      productRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.getProductByCode('P001')).rejects.toThrow(
        new NotFoundException('Product not found'),
      );
    });
  });

  describe('addProduct', () => {
    it('should create and return a new product', async () => {
      const productData = { code: 'P001', name: 'Product 1' };
      const mockProduct = { id: 1, ...productData };

      productRepository.create = jest.fn().mockResolvedValue(mockProduct);

      const result = await service.addProduct(productData);

      expect(result).toEqual(mockProduct);
      expect(productRepository.create).toHaveBeenCalledWith(productData);
    });
  });

  describe('clearProducts', () => {
    it('should delete all products', async () => {
      productRepository.destroy = jest.fn().mockResolvedValue(undefined);
      productRepository.sequelize.query = jest
        .fn()
        .mockResolvedValue(undefined);

      await service.clearProducts();

      expect(productRepository.destroy).toHaveBeenCalledWith({ where: {} });
      if (process.env.NODE_ENV === Environment.Development) {
        expect(productRepository.sequelize.query).toHaveBeenCalledWith(
          'DELETE FROM sqlite_sequence WHERE name = "Products"',
        );
      }
    });
  });
});
