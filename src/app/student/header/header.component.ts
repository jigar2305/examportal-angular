import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  today: number = Date.now();
  firstName: any;

  constructor() {

   }

  ngOnInit(): void {
    this.firstName = localStorage.getItem("firstName")
  }

}
