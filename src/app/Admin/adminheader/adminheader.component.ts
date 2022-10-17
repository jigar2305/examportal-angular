import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  today: number = Date.now();
  firstName: any;

  constructor() {
    
   }

  ngOnInit(): void {
    this.firstName = localStorage.getItem("firstName")
  }
}
