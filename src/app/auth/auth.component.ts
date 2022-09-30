import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./authservice";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";

import {AlertComponent} from "../shared/alert/alert.component";
import {Placeholder} from "@angular/compiler/src/i18n/i18n_ast";
import {PlaceholderDirective} from "../shared/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, {static: false}) alertHost!: PlaceholderDirective;
  private closeSubscription!: Subscription;
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  error: any;

  constructor(private authservice: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.closeSubscription)
      this.closeSubscription.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {
      return;
    }
    this.isLoading = true;
    let email = authForm.value;

    let authObservable: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      this.error = '';
      authObservable = this.authservice.login(authForm.value.email, authForm.value.password);
    } else {
      this.error = '';
      authObservable = this.authservice.signup(authForm.value.email, authForm.value.password);
    }
    authObservable.subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorResponse => {
      this.showErrorAlert(errorResponse)
      //this.error = errorResponse.error.error.message;
      //console.error(errorResponse.error.error.message);
      this.isLoading = false;
      authForm.value.email = email;
      return;
    });
    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // The following wont work
    //let alertComponent = new AlertComponent();
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
