import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ColDef } from 'ag-grid-community';
import { ExamactionComponent } from './examaction.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  subjects: Array<any> = [];
  exams: Array<any> = [];
  users: any = [];
  examId: number = 0;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsforsubject: IDropdownSettings = {};
  userId: Array<number> = [];
  enrollexamform: FormGroup;
  subjectIds: Array<any> = [];
  examselected: any;

  constructor(
    private adminservice: AdminService,
    private tostr: ToastrService
  ) {
    this.enrollexamform = new FormGroup({
      userId: new FormControl([Validators.required]),
    });
  }

  colDefs: ColDef[] = [
    { field: 'examName' },
    {
      headerName: 'isshow',
      field: 'isshow',
    },
    {
      headerName: 'level',
      field: 'level',
    },
    {
      headerName: 'time',
      field: 'time',
    },
    {
      headerName: 'Action',
      field: 'examId',
      cellRenderer: ExamactionComponent,
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
    this.adminservice.listexam().subscribe((res) => {
      this.exams = res.data;
    });
  }

  ngOnInit(): void {
    this.getallsubject();
    this.getallexam();
    this.getuser();
    this.dropdownSettings = {
      idField: 'userId',
      textField: 'firstName',
    };
    this.dropdownSettingsforsubject = {
      idField: 'subjectId',
      textField: 'subjectName',
      allowSearchFilter: true,
    };
  }
  getallsubject() {
    this.adminservice.Listsubject().subscribe((res) => {
      this.subjects = res.data;
    });
  }
  getallexam() {
    this.adminservice.listexam().subscribe((res) => {
      this.exams = res.data;
      console.log(this.exams);
    });
  }
  deleteexam(examId: any) {
    this.adminservice.deleteExam(examId).subscribe(
      (res) => {
        this.tostr.success('exam deleted..');
        this.exams = this.exams.filter((r) => r.examId != examId);
      },
      (err) => {
        this.tostr.error('something went wrong');
      }
    );
  }

  getuser() {
    this.adminservice.listuser().subscribe(
      (res) => {
        this.users = res.data;
        this.users = this.users.filter((u: any) => u.role.roleName != 'admin');
      },
      (err) => {
        this.tostr.error('Technical error occourd');
      }
    );
  }
  setexamId(examId: number) {
    this.examId = examId;
  }
  enroll() {
    if (this.enrollexamform.valid) {
      this.enrollexamform.value.userId.forEach((element: any) => {
        if(element.userId){
          this.userId.push(element.userId);
        }
      });
      let enroll = {
        examId: this.examId,
        userId: this.userId,
      };


      this.adminservice.enrollexam(enroll).subscribe(
        (res) => {
          console.log(res);
          this.tostr.success('exam enroll successfully');
        },
        (err) => {
          console.log(err);
          this.tostr.error('sonething went wrong');
        }
      );

      this.userId = []
    } else {
      this.tostr.error('At least one', 'please select');
    }
  }
}
