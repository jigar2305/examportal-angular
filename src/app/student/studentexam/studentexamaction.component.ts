import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-studentexamaction',
  template: `
  <a routerLink="/student/paper/{{examId}}">start</a>
  `,
  styles: [
  ]
})
export class StudentexamactionComponent implements OnInit,ICellRendererAngularComp {
  examId!:number
  date!:string
  startAt!:string
  today!: string
  isshow:boolean = false;

  agInit(params: ICellRendererParams<any, any>): void {
    this.examId = params.value.examId
    console.log(params.value.date);

    this.date = params.value.date.substring(0, 10);
    this.startAt = params.value.startAt
    this.check()
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }
  constructor(private datePipe:DatePipe) {
  }

  ngOnInit(): void {
  }
  check(){
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd') as string

   let date1 = formatDate(this.today,'yyyy-MM-dd','en_US');
  let  date2 = formatDate(this.date,'yyyy-MM-dd','en_US');
console.log(date1 +" "+date2);

console.log(date1 < date2);



  }

}
