import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'cookbook';
  selection: string = 'recipe';

  onNavigate($event: any) {
    console.log($event);
    this.selection = $event;
  }
}
