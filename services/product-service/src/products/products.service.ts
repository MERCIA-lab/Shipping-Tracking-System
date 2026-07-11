import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check for duplicate SKU
    const existingSku = await this.productRepository.findOne({
      where: { sku: createProductDto.sku },
    });

    if (existingSku) {
      throw new ConflictException(`Product with SKU ${createProductDto.sku} already exists`);
    }

    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(
    storeId: string,
    page: number = 1,
    limit: number = 10,
    search?: string,
    category?: string,
    status?: string,
  ): Promise<{ data: Product[]; total: number; page: number; pages: number }> {
    const where: any = { storeId, deletedAt: null };

    if (category) where.category = category;
    if (status) where.status = status;
    if (search) {
      where.name = Like(`%${search}%`);
    }

    const [products, total] = await this.productRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: products,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        id: In(ids),
        deletedAt: null,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // Check for duplicate SKU if changing it
    if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
      const existingSku = await this.productRepository.findOne({
        where: { sku: updateProductDto.sku },
      });
      if (existingSku) {
        throw new ConflictException(`Product with SKU ${updateProductDto.sku} already exists`);
      }
    }

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    product.deletedAt = new Date();
    await this.productRepository.save(product);
  }

  async getCategories(storeId: string): Promise<string[]> {
    const results = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .where('product.storeId = :storeId', { storeId })
      .andWhere('product.deletedAt IS NULL')
      .getRawMany();

    return results.map((r) => r.category).filter(Boolean);
  }

  async updateStock(productId: string, quantity: number): Promise<Product> {
    const product = await this.findOne(productId);
    product.stock += quantity;
    if (product.stock < 0) product.stock = 0;
    return await this.productRepository.save(product);
  }

  async getStats(storeId: string): Promise<{
    totalProducts: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
  }> {
    const products = await this.productRepository.find({
      where: { storeId, deletedAt: null },
    });

    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const lowStockCount = products.filter((p) => p.stock <= 5 && p.stock > 0).length;
    const outOfStockCount = products.filter((p) => p.stock === 0).length;

    return {
      totalProducts: products.length,
      totalValue,
      lowStockCount,
      outOfStockCount,
    };
  }
}
