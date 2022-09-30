import { NgModule } from '@angular/core';
import {ShoppingListComponent} from "../shopping-list.component";
import {ShoppingEditComponent} from "../../shopping-edit/shopping-edit.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared-module/shared-module.module";



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '', component: ShoppingListComponent
      }
    ]),
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ShoppingModule { }
