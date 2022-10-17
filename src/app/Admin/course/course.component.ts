import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, Grid, GridOptions } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { CourseactionComponent } from './courseaction.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Array<any> = []



  constructor(private adminservice: AdminService, private toster: ToastrService) {

  }
  onFilterTextBoxChanged() {
    this.gridOptions.api!.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  ngOnInit(): void {
    this.getallcourses()
  }
  gridOptions: GridOptions = {
    columnDefs: [
    { field: 'courseName' },
    {
      headerName: 'Delete',
      field: 'courseId',
      cellRenderer: CourseactionComponent,
    }
  ],
  defaultColDef: {
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  },
  rowData :this.courses,
  cacheQuickFilter: true,
}


  getallcourses() {
    this.adminservice.Listcourse().subscribe(res => {
      console.log(res);
      this.courses = res.data
    })
  }

  // new Grid(this.gridDiv, this.gridOptions);
  // gridDiv = document.querySelector<HTMLElement>('#myGrid')!;


}
