import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.recipe === undefined)
    {
      this.recipe = new Recipe('', '','',[]);
    }
    this.route.params.subscribe(params=>{
      let id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(id);
    });


  }

  sendToShoppingList() {
    console.log(this.recipe?.ingredients);
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    //this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
