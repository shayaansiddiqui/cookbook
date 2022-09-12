import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editedItemIndex: number = -1;
  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingList.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;;
      this.editMode = true;
    });
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  addIngredient(form: NgForm) {
    const value = form.value;
    let ingredient = new Ingredient(value.name, value.amount);
    this.shoppingList.addIngredient(ingredient);
  }

}
