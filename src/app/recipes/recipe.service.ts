import { Recipe } from "./recipe.model";
import {  Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();//Event used to interact with original data instead of copy of it

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

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());//Event which makes original data to be used, not copy that is passed with slice
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());//emit event that data was changed
  }
}
