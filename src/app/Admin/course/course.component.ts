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

  constructor(
    private adminservice: AdminService,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {

  }

  colDefs: ColDef[] = [
    { field: 'courseName' },
    {
      headerName: 'Delete',
      field: 'courseId',
      cellRenderer: CourseactionComponent,
    },
  ];
  defaultColDef: ColDef = {
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
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
}
