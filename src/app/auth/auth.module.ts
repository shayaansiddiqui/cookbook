import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {AppComponent} from "../app.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared-module/shared-module.module";

const authRoutes: Routes = [{
  path: '', component: AuthComponent
}]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authRoutes),
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AuthModule { }
