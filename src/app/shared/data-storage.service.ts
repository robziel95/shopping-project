import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService ) { }

  storeRecipes() {
    // put overwrites data in firebase
    return this.http.put('https://shopping-app-udemy.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    // ....-.json nneds to be added at the end
  }

  getRecipes(){
    const token = this.authService.getToken();

    this.http.get('https://shopping-app-udemy.firebaseio.com/recipes.json?auth=' + token)
    .pipe(map(
        // map ensures that in situation when we get empty array of ingredients, it will pass empty array to setRecipes
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes){
            if (!recipe['ingredients']){
              // if searches for empty ingredients array for each recipe
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
    )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
