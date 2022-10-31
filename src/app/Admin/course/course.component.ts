import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, Grid, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { CourseactionComponent } from './courseaction.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  courses: Array<any> = [];
  searchText: any;
  gridApActive: any;
  subject:Array<any> = []
  courseId!:number

  constructor(
    private adminservice: AdminService,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {

  }

  colDefs: ColDef[] = [
    { field: 'courseName' },
    {
      headerName: 'Action',
      field: 'courseId',
      maxWidth:200,
      minWidth:100,
      cellRenderer: CourseactionComponent,
    },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };
  onFilterBoxChange() {
    this.gridApActive.setQuickFilter(this.searchText);
  }
  onGridReady(params: any) {
    this.gridApActive = params.api;
    this.adminservice.Listcourse().subscribe((res: { data: any }) => {
      this.courses = res.data;
      console.log(this.courses);
    });
  }
  checkfordelete(courseId: any){
    let e = document.getElementById("model")
    e?.click()
    console.log(e);
    this.adminservice.iscontainsubject(courseId).subscribe((res)=>{
      this.subject = res.data
      console.log(this.subject);
      this.courseId = courseId
    })

  }
  deletecourse() {
    this.adminservice.deletecourse(this.courseId).subscribe(res => {
      this.courses = this.courses.filter(r => r.courseId != this.courseId)
      this.tostr.success("course deleted..")
    }, err => {
      this.tostr.error("something went wrong")
    })
  }
}
