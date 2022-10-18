import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { ColDef } from 'ag-grid-community';
import { ExamactionComponent } from './examaction.component';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  subjects: Array<any> = []
  examform: FormGroup
  exams: Array<any> = []
  users: any = []
  examId: number = 0;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsforsubject: IDropdownSettings = {};
  userId: Array<number> = [];
  enrollexamform: FormGroup;
  subjectIds: Array<any> = []
  examselected: any



  constructor(private adminservice: AdminService, private tostr: ToastrService) {
    this.examform = new FormGroup({
      time: new FormControl('',[Validators.required]),
      examName: new FormControl('', [Validators.required])
    })
    this.enrollexamform = new FormGroup({
      userId: new FormControl([Validators.required])
    })
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
      headerName: 'enroll',
      field: 'examId',
      cellRenderer : function(params:any){
        return '<b styles="cursor:pointer;"  data-bs-toggle="modal" data-bs-target="#verticalycentered2" (click)="setexamId(i.examId)">start</b>'
    }
    },
    {
      headerName: 'Action',
      field: 'examId',
      cellRenderer:ExamactionComponent
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


















  select() {
    console.log(this.examselected);
    this.subjectIds.forEach((element: any) => {
      element["number"] = 0;
    });
    console.log(this.subjectIds);
  }

  addexamquestions() {
    let addquestion = {
      "exam": this.examselected,
      "subjects": this.subjectIds
    }
    console.log(addquestion);

    if (this.examselected == null || this.subjectIds.length == 0) {
      this.tostr.error("please fill form correctly")
    }else{
      this.adminservice.addexamquestionsbymanysubjects(addquestion).subscribe((res)=>{
        console.log(res);
        this.tostr.success("questions added to exam" + this.examselected.examName)
      },(err)=>{
        console.log(err);
      })
    }
  }

  ngOnInit(): void {
    this.getallsubject()
    this.getallexam()
    this.getuser()
    this.dropdownSettings = {
      idField: 'userId',
      textField: 'firstName',
    };
    this.dropdownSettingsforsubject = {
      idField: 'subjectId',
      textField: 'subjectName',
      allowSearchFilter: true
    };
  }
  getallsubject() {
    this.adminservice.Listsubject().subscribe(res => {
      this.subjects = res.data
    })
  }
  getallexam() {
    this.adminservice.listexam().subscribe(res => {
      this.exams = res.data
      console.log(this.exams);


    })
  }
  addexam() {
    if (this.examform.valid) {
      this.adminservice.addexam(this.examform.value).subscribe(res => {
        this.tostr.success("exam added..")
        this.getallexam()
      }, err => {
        this.tostr.error("something went wrong")
      })
    }
  }
  deleteexam(examId: any) {
    this.adminservice.deleteExam(examId).subscribe(res => {
      this.tostr.success("exam deleted..")
      this.exams = this.exams.filter(r => r.examId != examId)
    }, err => {
      this.tostr.error("something went wrong")
    })
  }

  getuser() {
    this.adminservice.listuser().subscribe(res => {
      this.users = res.data
      console.log(this.users);


    }, err => {
      this.tostr.error("sonething went wrong");
    })
  }
  setexamId(examId: number) {
    this.examId = examId
  }
  enroll() {
    if (this.enrollexamform.valid) {

      this.enrollexamform.value.userId.forEach((element: any) => {
        this.userId.push(element.userId)
      });
      let enroll = {
        "examId": this.examId,
        "userId": this.userId
      }
      this.adminservice.enrollexam(enroll).subscribe((res) => {
        console.log(res);
        this.tostr.success("exam enroll successfully")
      }, (err) => {
        console.log(err);

        this.tostr.error("sonething went wrong");
      })
      console.log(enroll);
    } else {
      this.tostr.error("At least one", "please select")
    }
  }



}
