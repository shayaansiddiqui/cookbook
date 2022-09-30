import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "../shopping-list.component";
import {ShoppingEditComponent} from "../../shopping-edit/shopping-edit.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '', component: ShoppingListComponent, children: [
      {path: ':id', component: ShoppingEditComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ShoppingRoutingModule {}
