import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { ExamComponent } from './exam.component';

@Component({
  selector: 'app-examaction',
  template: `

      <i class="bi bi-trash" (click)="deleteexam()"></i>
      &nbsp;&nbsp;
      <i styles="cursor:pointer;"  class="ri-user-add-line"  data-bs-toggle="modal" data-bs-target="#largeModal" (click)="setexam(value)"></i>
      <!-- <i styles="cursor:pointer;"  class="ri-user-add-line"  data-bs-toggle="modal" data-bs-target="#largeModal" (click)="setexam(value)"></i> -->
      &nbsp;&nbsp;
      <a routerLink="/admin/exam/examresult/{{value}}">result</a>
      &nbsp;&nbsp;
      <a routerLink="/admin/exam/waiting/{{value}}">watch</a>
  `,
  styles: [],
})
export class ExamactionComponent implements OnInit, ICellRendererAngularComp {
  value: any;
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  constructor(
    private adminservice: AdminService,
    private toster: ToastrService,
    private examcomponent: ExamComponent
  ) { }
  deleteexam() {
    this.examcomponent.checkfordelete(this.value);
  }
  setexam(examId: number) {
    this.examcomponent.setexamId(examId)
  }

  ngOnInit(): void { }
}
