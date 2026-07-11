import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

interface ProductRecord {
  id: string;
  storeId: string;
  name: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  status: 'active' | 'draft' | 'archived';
  image?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ProductsService {
  private readonly products: ProductRecord[] = [
    {
      id: 'prod-1',
      storeId: 'demo-store',
      name: 'Wireless Headphones',
      sku: 'WH-001',
      price: 129.99,
      cost: 79.99,
      stock: 12,
      category: 'Electronics',
      status: 'active',
      description: 'Noise-cancelling over-ear headphones',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prod-2',
      storeId: 'demo-store',
      name: 'USB-C Cable',
      sku: 'USB-001',
      price: 19.99,
      cost: 9.5,
      stock: 3,
      category: 'Accessories',
      status: 'active',
      description: 'Fast charging USB-C cable',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  async create(createProductDto: CreateProductDto): Promise<ProductRecord> {
    const product: ProductRecord = {
      id: `prod-${Date.now()}`,
      ...createProductDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as ProductRecord;

    this.products.push(product);
    return product;
  }

  async findAll(
    storeId: string,
    page: number = 1,
    limit: number = 10,
    search?: string,
    category?: string,
    status?: string,
  ): Promise<{ data: ProductRecord[]; total: number; page: number; pages: number }> {
    const filtered = this.products.filter((product) => {
      const matchesStore = product.storeId === storeId;
      const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || product.category === category;
      const matchesStatus = !status || product.status === status;
      return matchesStore && matchesSearch && matchesCategory && matchesStatus;
    });

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      total: filtered.length,
      page,
      pages: Math.max(1, Math.ceil(filtered.length / limit)),
    };
  }

  async findOne(id: string): Promise<ProductRecord> {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async findByIds(ids: string[]): Promise<ProductRecord[]> {
    return this.products.filter((product) => ids.includes(product.id));
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductRecord> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto, { updatedAt: new Date().toISOString() });
    return product;
  }

  async remove(id: string): Promise<void> {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    this.products.splice(index, 1);
  }

  async getCategories(storeId: string): Promise<string[]> {
    return [...new Set(this.products.filter((product) => product.storeId === storeId).map((product) => product.category))];
  }

  async updateStock(productId: string, quantity: number): Promise<ProductRecord> {
    const product = await this.findOne(productId);
    product.stock = Math.max(0, product.stock + quantity);
    product.updatedAt = new Date().toISOString();
    return product;
  }

  async getStats(storeId: string): Promise<{
    totalProducts: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
  }> {
    const products = this.products.filter((product) => product.storeId === storeId);
    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    const lowStockCount = products.filter((product) => product.stock <= 5 && product.stock > 0).length;
    const outOfStockCount = products.filter((product) => product.stock === 0).length;

    return {
      totalProducts: products.length,
      totalValue,
      lowStockCount,
      outOfStockCount,
    };
  }
}
