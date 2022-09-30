import { NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipeRoutingModule} from "./recipe-routing/recipe-routing.module";
import {SharedModule} from "../shared/shared-module/shared-module.module";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    SharedModule
  ]
})

export class RecipeModule {}
