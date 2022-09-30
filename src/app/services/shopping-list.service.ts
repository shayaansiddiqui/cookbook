import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Sugar", 1.5),
    new Ingredient("Tomato", 3)
  ];

  constructor() { }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  contains(sourceArray: any,targetArray: any) {
    let counter = 0;
    for(var i = 0; i < targetArray.length; i++) {
      if(sourceArray.includes(targetArray[i].name))
        counter++;
    }
    if(counter === targetArray.length) {
      return true;
    } else {
      this.ingredients.push(targetArray);
    }
    return false;
  }

  addIngredients(ingredientList: Ingredient[] | undefined) {
    // for(var i=0; i < <number>ingredients?.length; i++) {
    //   this.ingredients.push(<Ingredient>ingredients?.[i]);
    // }
    this.ingredients.push(...<Ingredient[]>ingredientList);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  getIngredients() {
      return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
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
