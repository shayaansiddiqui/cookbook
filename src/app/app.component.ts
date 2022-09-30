import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/authservice";
import {LoggingService} from "./shared/logging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'cookbook';
  selection: string = 'recipe';

  constructor(private authService: AuthService, private loggingService: LoggingService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent');
  }
}
