import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToOne(() => Category, (category) => category.recipes)
  // @JoinColumn({ name: 'category_id' })
  // category: Category;

  @ManyToMany(() => Category, (category) => category.recipes)
  categories: Category[];

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
