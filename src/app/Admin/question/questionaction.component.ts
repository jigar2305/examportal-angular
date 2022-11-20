import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { ListQuestionComponent } from '../list-question/list-question.component';

@Component({
  selector: 'app-questionaction',
  template: `
    <p>
      <i class="bi bi-trash" (click)="deletequestion(value)"></i>
      &nbsp;&nbsp;
      <a routerLink="/admin/question/edit/{{value}}"><i class="ri-edit-2-fill"></i></a>
    </p>
  `,
  styles: [],
})
export class QuestionactionComponent
  implements OnInit, ICellRendererAngularComp
{
  value: any;
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  constructor(
    private aservice: AdminService,
    private tostr: ToastrService,
    private quecomponent: ListQuestionComponent
  ) {}
  ngOnInit(): void {}
  deletequestion(questionId:number) {
    this.quecomponent.checkfordelete(questionId);
  }
}
