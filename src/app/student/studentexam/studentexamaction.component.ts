import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-studentexamaction',
  template: `
  <a routerLink="/student/paper/{{value}}">start</a>
  `,
  styles: [
  ]
})
export class StudentexamactionComponent implements OnInit,ICellRendererAngularComp {
  value: any;
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
