import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { SubjectComponent } from './subject.component';

@Component({
  selector: 'app-subjectaction',
  template: `
    <p>
    <i class="bi bi-trash" (click) = "deletesubject(value)"></i>
    <a  routerLink="/admin/course/edit" ><i class="ri-edit-2-fill"></i></a>
    </p>
  `,
  styles: [
  ]
})
export class SubjectactionComponent implements OnInit,ICellRendererAngularComp {

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
    private subj:SubjectComponent
  ) {}

  ngOnInit(): void {

  }
  deletesubject(subjectId: any) {
    this.adminservice.deletesubject(subjectId).subscribe(
      (res) => {
        this.toster.success('subject deleted..');
        this.subj.updateAllRow()
      },
      (err) => {
        this.toster.error('something went wrong');
      }
    );
  }

}
