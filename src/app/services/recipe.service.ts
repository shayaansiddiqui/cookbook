import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe('Tasty Schnitzel', 'A super tasty schnitzel', 'https://fthmb.tqn.com/lC8KVti3VMBfaV-fKh1AS4uWNAg=/5616x3744/filters:fill(auto,1)/wiener-schnitzel-the-popular-breadcrumb-coated-cutlet-of-veal-a-traditional-germanic-dish-served-in-munich-bavaria-germany-europe-450764475-5888d1a55f9b58bdb3cc9223.jpg', [new Ingredient('Meat', 1), new Ingredient('French Fries', 1)]),
  //   new Recipe('Big Fat Burger', '3 x 12 oz Patty with Ketchup, Mayo, Letuce, Onion and Pickle', 'https://th.bing.com/th/id/R.79ad2168503d3dc43ee981a3cdd307cf?rik=LA8OuAODyfHykQ&riu=http%3a%2f%2fwww.fatburgercanada.com%2fwp-content%2fuploads%2f2015%2f07%2fking-burger-685x802.png&ehk=KGG2G6NpcB3GdQY5JvWZBkSCuHtjsQBsCbIUeAGBYfU%3d&risl=&pid=ImgRaw&r=0', [new Ingredient('Meat', 3), new Ingredient('Onions', 1), new Ingredient('Ketchup', 1), new Ingredient('Mayo', 1)])
  // ];
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteIngredientById(recipeIndex: number, ingredientIndex: number) {
    let recipe = this.recipes.slice()[recipeIndex];
    let ingredients = recipe.ingredients[ingredientIndex];
    //recipe.ingredients.splice(ingredientIndex, 1);
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
