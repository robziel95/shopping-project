import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 15),
        new Ingredient('Oranges', 7)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingreientToAdd: Ingredient){
        this.ingredients.push(ingreientToAdd);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        // Below loop emits a lot of events (unnecessary)
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }

        // ...operator spreads whole array as a list of single items, otherwise it would add array of elements into the array
        this.ingredients.push(...ingredients);
        // single emit for changed array (to update in shopping list)
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
