import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { EditsubjectComponent } from './editsubject.component';

@Component({
  selector: 'app-deletefile',
  template: `
    <i class="bi bi-trash" (click) = "deletefile(value)"></i>
  `,
  styles: [
  ]
})
export class DeletefileComponent implements OnInit,ICellRendererAngularComp {

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
    private editfile:EditsubjectComponent
  ) {}
  deletefile(subjectfileId: number) {
    console.log(subjectfileId);
    this.adminservice.deletesubjectfile(subjectfileId).subscribe(
      (res) => {
        this.editfile.deletefileremove(subjectfileId)
        this.toster.success('file deleted....');
      },
      (err) => {
        this.toster.error('something went wrong');
      }
    );
  }

  ngOnInit(): void {
  }

}
