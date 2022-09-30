import { NgModule} from "@angular/core";
import {ShoppingListService} from "./services/shopping-list.service";
import {RecipeService} from "./services/recipe.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthinterceptorserviceInterceptor} from "./auth/authinterceptorservice.interceptor";

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorserviceInterceptor, multi: true}
  ]
})
export class CoreModule {}
