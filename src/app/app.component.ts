import { Component } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'examportal';
  SPINNER!:SPINNER
  // SPINNER!:any
}
