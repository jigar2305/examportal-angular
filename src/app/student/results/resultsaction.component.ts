import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-resultsaction',
  template: `
    <a routerLink="/student/result/{{examId}}/{{resultId}}">view result </a>

  `,
  styles: [
  ]
})
export class ResultsactionComponent implements OnInit,ICellRendererAngularComp {
  resultId!:number
  examId!:number
  value: any;
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value;
    this.examId = params.value.examId
    this.resultId = params.value.resultId
    console.log(this.value);

  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
