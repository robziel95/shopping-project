import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
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

    getIngredient(index: number) {
        return this.ingredients[index];
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

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
