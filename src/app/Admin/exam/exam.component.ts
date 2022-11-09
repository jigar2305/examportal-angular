import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ExamactionComponent } from './examaction.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {

  exams: Array<any> = [];
  users: any = [];
  examId: number = 0;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsforsubject: IDropdownSettings = {};
  userId: Array<any> = [];
  Ids: Array<any> = [];
  enrollexamform: FormGroup;
  subjectIds: Array<any> = [];
  examselected: any;
  count!: number;
  checkArray:Array<any>=[]
  filterText!: string;
  constructor(
    private adminservice: AdminService,
    private tostr: ToastrService
  ) {
    this.enrollexamform = new FormGroup({
      ids: new FormControl([Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getallexam();
    this.getuser();
    this.dropdownSettings = {
      idField: 'userId',
      textField: 'firstName',
      allowSearchFilter: true,
    };
  }

  colDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'examName'
    },
    {
      headerName: 'Is Answer Show',
      field: 'isshow',
      minWidth: 100,
      maxWidth: 150,
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value) {
          return 'yes';
        } else {
          return 'No';
        }
      },
    },
    {
      headerName: 'Date',
      field: 'date',
      minWidth: 100,
      maxWidth: 180,
      cellRenderer: (params: ICellRendererParams) => {
        let date = params.value as string;
        return date;
      },
    },
    {
      headerName: 'Start Time',
      field: 'startAt',
      minWidth: 100,
      maxWidth: 150,
      cellRenderer: (params: ICellRendererParams) => {
        let timeString = params.value as string;
        if (timeString != null) {

          const [hourString, minute] = timeString.split(':');
          const hour = +hourString % 24;
          return (
            (hour % 12 || 12) + ':' + minute + ' ' + (hour < 12 ? 'AM' : 'PM')
          );
        } else {
          return "---"
        }
      }
    },
    {
      headerName: 'End Time',
      field: 'endAt',
      minWidth: 100,
      maxWidth: 150,
      cellRenderer: (params: ICellRendererParams) => {
        let timeString = params.value as string;
        if (timeString != null) {

          const [hourString, minute] = timeString.split(':');
          const hour = +hourString % 24;
          return (
            (hour % 12 || 12) + ':' + minute + ' ' + (hour < 12 ? 'AM' : 'PM')
          );
        } else {
          return "---"
        }
      }
    },
    {
      headerName: 'level',
      field: 'level',
      minWidth: 100,
      maxWidth: 100,
    },

    {
      headerName: 'Time',
      field: 'time',
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value < 60) {
          return params.value + " " + "minute"
        } else if (params.value == 60) {
          return "1 hour";
        } else {
          let time = Math.trunc((params.value / 60))
          let minute = params.value % 60
          return time + " : " + minute + " minute"
        }
      },
    },
    {
      headerName: 'Action',
      field: 'examId',
      maxWidth: 300,
      minWidth: 200,
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



  getallexam() {
    this.adminservice.listexam().subscribe((res) => {
      this.exams = res.data;
      console.log(this.exams);
    });
  }
  checkfordelete(examId: any) {
    document.getElementById('model')?.click();
    this.adminservice.isenroll(examId).subscribe(
      (res) => {
        this.count = res.data;
        this.examId = examId;
      },
      (err) => {
        this.tostr.error('Technical error accoured');
      }
    );
  }
  delete() {
    this.adminservice.deleteExam(this.examId).subscribe(
      (res) => {
        this.tostr.success('exam deleted..');
        this.exams = this.exams.filter((r) => r.examId != this.examId);
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
        this.users.forEach((element: any) => {
          this.userId.push({ "userId": element.userId, "firstName": element.firstName, "lastName": element.lastName, "ischeck": false })
        });
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
    this.userId.forEach(element => {
      if (element.ischeck) {
        this.Ids.push(element.userId)
      }
    })
    if (this.Ids != null) {
      let enroll = {
        examId: this.examId,
        userId: this.Ids,
      };
      this.adminservice.enrollexam(enroll).subscribe(
        (res) => {
          this.tostr.success('exam enroll successfully');
        },
        (err) => {
          this.tostr.error(err.error.msg);
        }
      );

      this.Ids = [];
    } else {
      this.tostr.error('At least one', 'please select');
    }
  }

  filter() {
    if (this.filterText.length > 0 && this.filterText != '') {
      this.userId = [];
      this.users.forEach((element: any) => {
        this.userId.push({ "userId": element.userId, "firstName": element.firstName, "lastName": element.lastName, "ischeck": element.ischeck })
      });
      this.userId = this.userId.filter(e => (e.firstName + " " + e.lastName).toLowerCase().includes(this.filterText) || (e.firstName + "" + e.lastName).toLowerCase().includes(this.filterText))
    } else {
      this.userId = [];
      this.users.forEach((element: any) => {
        this.userId.push({ "userId": element.userId, "firstName": element.firstName, "lastName": element.lastName, "ischeck": element.ischeck })
      });
    }
  }
  check(user:any) {
    if(user.ischeck){
      this.users.forEach((element:any) => {
        if(user.userId == element.userId){
          element.ischeck = false
        }
      });
    }else{
     this.users.forEach((element:any) => {
      if(user.userId == element.userId){
        element.ischeck = true
      }
    });
    }
  }
}
