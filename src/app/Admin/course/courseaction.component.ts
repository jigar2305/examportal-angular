import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { CourseComponent } from './course.component';

@Component({
  selector: 'app-courseaction',
  template: `
    <i class="bi bi-trash" (click) = "deletecourse(value)"></i>
    <a  routerLink="/admin/course/edit/{{value}}" ><i class="ri-edit-2-fill"></i></a>
  `,
  styles: [
    `
    i{
      margin-right:20px;
    }

    `
  ]
})
export class CourseactionComponent implements OnInit,ICellRendererAngularComp {

  value: any;
  constructor(private aservice:AdminService ,private tostr:ToastrService,private ccomponent:CourseComponent) {}
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  ngOnInit(): void {
  }
  deletecourse(courseId: any) {
    this.aservice.deletecourse(courseId).subscribe(res => {
      this.ccomponent.deletecourse(courseId);
      this.tostr.success("course deleted..")
    }, err => {
      this.tostr.error("something went wrong")
    })
  }

}
