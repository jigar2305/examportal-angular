import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { SubjectactionComponent } from './subjectaction.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  subjects: Array<any> = [];
  gridApActive: any;
  searchText: any;
  constructor(
    private adminservice: AdminService,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
  }

  colDefs: ColDef[] = [
    { field: 'subjectName' },
    {
      headerName: 'courseName',
      field: 'course.courseName',
    },
    {
      headerName: 'Action',
      field: 'subjectId',
      cellRenderer: SubjectactionComponent,
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
    this.adminservice.Listsubject().subscribe((res) => {
      this.subjects = res.data;
    });
  }
  updateAllRow(){
    this.adminservice.Listsubject().subscribe((res) => {
      this.subjects = res.data;
    });
  }
  updateondelete(subjectId:number){
    this.subjects = this.subjects.filter((r) => r.subjectId != subjectId);
  }
}
