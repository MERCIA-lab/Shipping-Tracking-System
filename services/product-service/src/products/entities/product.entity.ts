import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('products')
@Index(['storeId'])
@Index(['status'])
@Index(['category'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  storeId!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  sku!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost!: number;

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column()
  category!: string;

  @Column({ enum: ['active', 'draft', 'archived'], default: 'draft' })
  status!: 'active' | 'draft' | 'archived';

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'json', nullable: true })
  variants?: Record<string, any>;

  @Column({ type: 'int', default: 0 })
  views!: number;

  @Column({ type: 'int', default: 0 })
  sales!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  // Calculated field (not persisted)
  get profitMargin(): number {
    if (this.price === 0) return 0;
    return ((this.price - this.cost) / this.price) * 100;
  }
}
