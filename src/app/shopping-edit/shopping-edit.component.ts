import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('f') shoppingListForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex: number = -1;
  editedItem!: Ingredient;
  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingList.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;;
      this.editMode = true;
      this.editedItem = this.shoppingList.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  addIngredient(form: NgForm) {
    const value = form.value;
    let ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingList.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingList.addIngredient(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.shoppingList.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.shoppingListForm.reset();
  }
}
