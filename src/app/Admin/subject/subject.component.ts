import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  quetion!: number
  gridApActive: any;
  searchText: any;
  users: Array<any> = [];
  dropdownSettingsforuser: IDropdownSettings = {};
  dropdownSettingsforsubject: IDropdownSettings = {};
  enrollsubjectform: FormGroup;
  subjectId!: number;
  constructor(
    private adminservice: AdminService,
  ) {
    this.enrollsubjectform = new FormGroup({
      userId: new FormControl([Validators.required]),
      subjectId: new FormControl([Validators.required])
    })
  }

  ngOnInit(): void {
    this.adminservice.listuser().subscribe(res => {
      this.users = res.data
      this.users = this.users.filter((user) => user.role.roleName != 'admin')
    })
    this.dropdownSettingsforuser = {
      idField: 'userId',
      textField: 'firstName',
      allowSearchFilter: true
    };
    this.dropdownSettingsforsubject = {
      idField: 'subjectId',
      textField: 'subjectName',
      allowSearchFilter: true
    };
  }

  colDefs: ColDef[] = [
    {
      headerName: 'courseName',
      field: 'course.courseName',
    },
    { field: 'subjectName' },
    {
      headerName: 'Action',
      field: 'subjectId',
      maxWidth: 200,
      minWidth: 100,
      cellRenderer: SubjectactionComponent,
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
    this.adminservice.Listsubject().subscribe((res) => {
      this.subjects = res.data;
    });
  }
  updateAllRow() {
    this.adminservice.Listsubject().subscribe((res) => {
      this.subjects = res.data;
    });
  }
  checkfordelete(subjectId: any) {
    document.getElementById("model")?.click()
    this.adminservice.iscontainquestion(subjectId).subscribe((res) => {
      this.quetion = res.data
      this.subjectId = subjectId
    })
  }
  delete() {
    this.adminservice.deletesubject(this.subjectId).subscribe(
      (res) => {
        this.subjects = this.subjects.filter((r) => r.subjectId != this.subjectId);
      });
  }
  enroll() {
    let subjectIds: Array<number> = []
    this.enrollsubjectform.value.subjectId.forEach((element: any) => {
      if(element.subjectId != undefined || element.subjectId != null){
        subjectIds.push(element.subjectId)
      }
    });
    let userIds: Array<number> = []
    this.enrollsubjectform.value.userId.forEach((element: any) => {
      userIds.push(element.userId)
    });
    let enrollsubjectfile = {
      subjectId: subjectIds,
      userId: userIds
    }
    this.adminservice.enrolesubjectfiles(enrollsubjectfile).subscribe();
  }
}
