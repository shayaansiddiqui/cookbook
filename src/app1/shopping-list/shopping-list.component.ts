import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {LoggingService} from "../shared/logging.service";
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [LoggingService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[] = []
  private igChangedSub!: Subscription;
  ingredientAdded = new EventEmitter<Ingredient>();
  //   new Ingredient("Sugar", 1.5),
  //   new Ingredient("Tomato", 3)
  // ];
  constructor(private loggingService : LoggingService, private shoppingList: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingList.getIngredients();
    this.igChangedSub = this.shoppingList.ingredientsChanged.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    });
  }

  ngOnDestroy() {
    this.igChangedSub.unsubscribe();
  }
}
