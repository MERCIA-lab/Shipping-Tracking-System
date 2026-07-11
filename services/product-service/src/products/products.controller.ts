import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Create a new product
   * POST /api/products
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<any> {
    return await this.productsService.create(createProductDto);
  }

  /**
   * Get all products for a store with filtering
   * GET /api/products?storeId=xxx&page=1&limit=10&search=xxx&category=xxx&status=xxx
   */
  @Get()
  async findAll(
    @Query('storeId') storeId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('status') status?: string,
  ): Promise<any> {
    return await this.productsService.findAll(
      storeId,
      parseInt(page),
      parseInt(limit),
      search,
      category,
      status,
    );
  }

  /**
   * Get product categories
   * GET /api/products/categories?storeId=xxx
   */
  @Get('categories')
  async getCategories(@Query('storeId') storeId: string): Promise<any> {
    return await this.productsService.getCategories(storeId);
  }

  /**
   * Get store product stats
   * GET /api/products/stats?storeId=xxx
   */
  @Get('stats')
  async getStats(@Query('storeId') storeId: string): Promise<any> {
    return await this.productsService.getStats(storeId);
  }

  /**
   * Get a single product
   * GET /api/products/:id
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.productsService.findOne(id);
  }

  /**
   * Update a product
   * PATCH /api/products/:id
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<any> {
    return await this.productsService.update(id, updateProductDto);
  }

  /**
   * Delete a product (soft delete)
   * DELETE /api/products/:id
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    await this.productsService.remove(id);
    return { success: true, message: 'Product deleted' };
  }

  /**
   * Update product stock
   * PATCH /api/products/:id/stock
   */
  @Patch(':id/stock')
  async updateStock(@Param('id') id: string, @Body() { quantity }: { quantity: number }): Promise<any> {
    return await this.productsService.updateStock(id, quantity);
  }
}
