import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ShareService } from 'src/app/service/share.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-user-exam-action',
  template: `
    <p routerLink="/admin/user/result">view result </p>
  `,
  styles: [
  ]
})
export class UserExamActionComponent implements ICellRendererAngularComp {

  constructor(private aRoute: ActivatedRoute, private sservice: StudentService, private share: ShareService) { }

  agInit(params: ICellRendererParams<any, any>): void {
    console.log(params.value);
    this.share.setexamId(params.value.examId)
    this.share.setresultId(params.value.resultId)
    this.share.setuserId(params.value.userId)
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
}
