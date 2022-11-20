import { Component } from '@angular/core';
import { ColDef} from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { CourseactionComponent } from './courseaction.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent  {
  courses: Array<any> = [];
  searchText: any;
  gridApActive: any;
  subject:Array<any> = []
  courseId!:number

  constructor(
    private adminservice: AdminService,
    private tostr: ToastrService
  ) {}

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
    });
  }
  checkfordelete(courseId: any){
    document.getElementById("model")?.click()
    this.adminservice.iscontainsubject(courseId).subscribe((res)=>{
      this.subject = res.data
      this.courseId = courseId
    })

  }
  deletecourse() {
    this.adminservice.deletecourse(this.courseId).subscribe(res => {
      this.courses = this.courses.filter(r => r.courseId != this.courseId)
    })
  }
}
