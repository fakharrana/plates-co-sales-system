import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { Environment } from 'src/common/enums/environment.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    if (!products?.length) throw new NotFoundException('No products found');

    return products;
  }

  async getProductByCode(code: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { code } });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async addProduct(productData: Partial<Product>): Promise<Product> {
    return this.productRepository.create(productData);
  }

  async clearProducts(): Promise<void> {
    await this.productRepository.destroy({ where: {} });

    if (process.env.NODE_ENV === Environment.Development) {
      await this.productRepository.sequelize?.query(
        'DELETE FROM sqlite_sequence WHERE name = "Products"',
      );
    }
  }
}
