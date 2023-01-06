import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Adobo',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Chicken_adobo.jpg/1200px-Chicken_adobo.jpg',
      ingredients: ['chicken', 'garlic']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: 'https://panlasangpinoy.com/wp-content/uploads/2019/09/meaty-spaghetti.jpg',
      ingredients: ['Pasta', 'Tomato']
    },
  ];

  constructor() { }

  getAllRecipes() {
    return [...this.recipes]
  }

  getRecipe(recipeId: string) {
    return this.recipes.find(recipe => {
      return recipe.id === recipeId;
    })
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    });
  }
}
