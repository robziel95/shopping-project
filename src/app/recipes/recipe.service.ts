import { Recipe } from "./recipe.model";
import {  Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  constructor(private slService: ShoppingListService) { }

  private recipes: Recipe[] = [
    new Recipe(
      'Donut',
      'Test Donut',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4OmuElwP3MT79PetAeLFujI62sBYVYkXKZjFNlfiZiErQgT6Fig',
      [
        new Ingredient('Flour', 1),
        new Ingredient('Eggs', 3),
        new Ingredient('Chockolate', 2)
      ]),
    
      new Recipe(
        'Burger',
        'Burger test',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmdA-BiZHZ3L3tzjjAASerocT65jltx_Zz6NL_2fO_xYBz1jXQJA',
        [
          new Ingredient('Buns', 2),
          new Ingredient('Meat', 2),
          new Ingredient('Cheese', 1)
        ]),
  ];

  getRecipes(){
    //.slice is used to return array by copy, not by reference
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
