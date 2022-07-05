import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput')
  private elTitle = {} as ElementRef;
  @ViewChild('amountInput')
  private  elAmount = {} as ElementRef;
  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient(event: any) {
    console.log(event);
    console.log(this.elAmount.nativeElement.value);
    console.log(this.elTitle.nativeElement.value);
    let ingredient = new Ingredient(this.elTitle.nativeElement.value, this.elAmount.nativeElement.value);
    this.shoppingList.addIngredient(ingredient);
  }

}
