import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { PdfviewadminComponent } from './pdfviewadmin.component';

@Component({
  selector: 'app-pdfviewaction',
  template: `
    <i (click)="onclick(value)" class="bi bi-download"></i>
    <h5 class="bx bxs-file-pdf" (click)="openpdf(value)"></h5>
  `,
  styles: [`
    i{
      cursor:pointer;
      margin-right:20px;
    }
    `
  ]
})
export class PdfviewactionComponent implements OnInit,ICellRendererAngularComp {

  value: any;
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  onclick(subjectfileId:number){
    this.pdfvew.onClick(subjectfileId)
  }
  openpdf(subjectfileId:number){
    this.pdfvew.onview(subjectfileId)
  }
  ngOnInit(): void {
  }
  constructor(
    private pdfvew:PdfviewadminComponent
  ) {}

}
