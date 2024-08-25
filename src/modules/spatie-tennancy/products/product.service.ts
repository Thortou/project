import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Connect_DB } from 'src/common/enum/connect-ennum';

@Injectable()
export class ProductService {
  constructor(
    @InjectDataSource(Connect_DB.MAIN)
    private productRepository: DataSource,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.getRepository(Product).find();
  }

  async create(product: Product): Promise<Product> {
    return this.productRepository.getRepository(Product).save(product);
  }
}
