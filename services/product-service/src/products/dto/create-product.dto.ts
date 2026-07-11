import { IsString, IsNumber, IsEnum, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  storeId: string;

  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  category: string;

  @IsEnum(['active', 'draft', 'archived'])
  status: 'active' | 'draft' | 'archived';

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  variants?: Record<string, any>;
}
