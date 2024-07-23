import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    return await this.recipeRepository.save(createRecipeDto);
  }

  async findAll() {
    return this.recipeRepository.find();
  }

  async findOne(id: number) {
    return await this.recipeRepository.find({
      where: {
        id,
      },
    });
  }

  async getRandom() {
    let allRecipes = await this.recipeRepository.find();

    return allRecipes[Math.floor(Math.random() * (allRecipes.length + 1))];
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return await this.recipeRepository.update(id, updateRecipeDto);
  }

  async remove(id: number) {
    let recipe = await this.recipeRepository.find({
      where: {
        id,
      },
    });

    return await this.recipeRepository.remove(recipe);
  }
}
