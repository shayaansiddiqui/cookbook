import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../services/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/authservice";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private url: string = 'https://angular-shayaan-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url + 'recipes.json', recipes).subscribe(response => {
      console.log(response + " storeRecipes");
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url + 'recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
  );

  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap(user => {
  //       return this.http.get<Recipe[]>(this.url + 'recipes.json',
  //         {
  //           params: new HttpParams().set('auth', user.token ? user.token : '')
  //         }).pipe(
  //     map(recipes => {
  //       return recipes.map( recipe => {
  //         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
  //       });
  //     }),
  //     tap(recipes => {
  //       this.recipeService.setRecipes(recipes)
  //     })
  // );


    // return this.http.get<Recipe[]>(this.url + 'recipes.json').pipe(map(recipes => {
    //   return recipes.map(recipe => {
    //     return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
    //   })
    // }), tap(recipes => {
    //   this.recipeService.setRecipes(recipes)
    // }));
  }
}
