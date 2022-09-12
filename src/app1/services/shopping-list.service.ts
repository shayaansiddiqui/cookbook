import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Sugar", 1.5),
    new Ingredient("Tomato", 3)
  ];

  constructor(private slService: ShoppingListService) { }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
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

  // ngOnInit() {
  //   this.ingredients = this.slService.getIngredients();
  //   this.idChangeSub = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => { this.ingredients = ingredients; });
  // }
  //
  // ngOnDestroy() {
  //   this.idChangeSub.unsubscribe();
  // }

  addIngredients(ingredientList: Ingredient[] | undefined) {
    // for(var i=0; i < <number>ingredients?.length; i++) {
    //   this.ingredients.push(<Ingredient>ingredients?.[i]);
    // }
    this.ingredients.push(...<Ingredient[]>ingredientList);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
      return this.ingredients.slice();
  }
}
