import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { ExamComponent } from './exam.component';

@Component({
  selector: 'app-examaction',
  template: `
    <h4>
      <i class="bi bi-trash" (click)="deleteexam()"></i>
      &nbsp;&nbsp;
      <a routerLink="/admin/course/edit"><i class="ri-edit-2-fill"></i></a>
    </h4>
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
  ) {}
  deleteexam() {
    this.examcomponent.deleteexam(this.value);
  }

  ngOnInit(): void {}
}
