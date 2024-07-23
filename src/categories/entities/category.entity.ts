import { Recipe } from 'src/recipe/entities/recipe.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(() => Recipe, (recipe) => recipe.category)
  // recipes: Recipe[];

  @ManyToMany(() => Recipe, (recipe) => recipe.categories)
  @JoinTable()
  recipes: Recipe[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
