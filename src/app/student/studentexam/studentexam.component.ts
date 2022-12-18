import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  ICellRendererParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { StudentexamactionComponent } from './studentexamaction.component';

@Component({
  selector: 'app-studentexam',
  templateUrl: './studentexam.component.html',
  styleUrls: ['./studentexam.component.css'],
})
export class StudentexamComponent {
  exams: Array<any> = [];
  userId: any;
  constructor(
    private adminservice: AdminService,
    private tostr: ToastrService
  ) {}
  colDefs: ColDef[] = [
    { field: 'examName' },
    {
      headerName: 'Exam Date',
      field: 'date',
      cellRenderer: (params: ICellRendererParams) => {
        let date = params.value as string;
        return date;
      },
    },
    {
      headerName: 'Start Time',
      field: 'startAt',
      cellRenderer: (params: ICellRendererParams) => {
        let timeString = params.value as string;
        if (timeString != null) {
          const [hourString, minute] = timeString.split(':');
          const hour = +hourString % 24;
          return (
            (hour % 12 || 12) + ':' + minute + ' ' + (hour < 12 ? 'AM' : 'PM')
          );
        } else {
          return '---';
        }
      },
    },
    {
      headerName: 'End Time',
      field: 'endAt',
      cellRenderer: (params: ICellRendererParams) => {
        let timeString = params.value as string;
        if (timeString != null) {
          const [hourString, minute] = timeString.split(':');
          const hour = +hourString % 24;
          return (
            (hour % 12 || 12) + ':' + minute + ' ' + (hour < 12 ? 'AM' : 'PM')
          );
        } else {
          return '---';
        }
      },
    },
    {
      headerName: 'Action',
      valueGetter: this.examdetail,
      maxWidth: 200,
      minWidth: 100,
      cellRenderer: StudentexamactionComponent,
    },
  ];

  examdetail(params: ValueGetterParams) {
    return params.data;
  }
  defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };
  gridApActive: any;
  searchText: any;
  onFilterBoxChange() {
    this.gridApActive.setQuickFilter(this.searchText);
  }
  onGridReady(params: any) {
    this.gridApActive = params.api;
    this.userId = localStorage.getItem('userId');
    this.adminservice.listexambyid(this.userId).subscribe((res) => {
      this.exams = res.data;
    });
  }
}
