import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', loadChildren: () => import('./recipes/recipe.module').then(x => x.RecipeModule)},
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping/shopping.module').then(x => x.ShoppingModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)},
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
