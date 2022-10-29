import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { StudentexamactionComponent } from './studentexamaction.component';

@Component({
  selector: 'app-studentexam',
  templateUrl: './studentexam.component.html',
  styleUrls: ['./studentexam.component.css']
})
export class StudentexamComponent implements OnInit {
  exams: Array<any> = []
  userId:any
  constructor(private adminservice: AdminService, private tostr: ToastrService) { }

  ngOnInit(): void {
  }

  colDefs: ColDef[] = [
    { field: 'examName' },
    {
      headerName: 'Action',
      field: 'examId',
      cellRenderer: StudentexamactionComponent,
    },
  ];
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
    this.userId = localStorage.getItem("userId")
    this.adminservice.listexambyid(this.userId).subscribe(res => {
      this.exams = res.data

    })
  }


}
