import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, RowGroupingDisplayType } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {

  question: string = ''
  a: string = ''
  b: string = ''
  c: string = ''
  d: string = ''
  correctAnswer: string = ''
  level: string = ''
  questionobj: any


  ngOnInit(): void {

  }
  gridApActive: any;
  searchText: any;
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';

  colDefs: ColDef[] = [
    { headerName: 'subjectName',
      field: 'subject.subjectName',
      rowGroup: true, hide: true
  },
    {
      headerName: 'question',
      field: 'question',
    },
    {
      headerName: 'A',
      field: 'a',
    },
    {
      headerName: 'B',
      field: 'b',
    },
    {
      headerName: 'C',
      field: 'c',
    },
    {
      headerName: 'D',
      field: 'd',
    },
    {
      headerName: 'CorrectAnswer',
      field: 'correctAnswer',
    },
    {
      headerName: 'level',
      field: 'level',
    },
    {
      headerName: 'Action',
      field: 'quesrionId',
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
    this.aservice.listquestions().subscribe((res) => {
      this.questions = res.data;
      console.log(this.questions);
    });
  }






























  updatequestion(q: any) {
    this.question = q.question
    this.a = q.a
    this.b = q.b
    this.c = q.c
    this.d = q.d
    this.correctAnswer = q.correctAnswer
    this.level = q.level
    this.questionobj = q
  }
  onupdate() {
    this.questionobj.question = this.question
    this.questionobj.a = this.a
    this.questionobj.b = this.b
    this.questionobj.c = this.c
    this.questionobj.d = this.d
    this.questionobj.correctAnswer = this.correctAnswer
    this.questionobj.level = this.level
    if (this.question.length == 0 || this.a.length == 0 || this.b.length == 0 || this.c.length == 0 || this.d.length == 0 || this.correctAnswer.length == 0 || this.level.length == 0) {
      this.tostr.error("blank field not accepted..")
    } else {

      this.aservice.updatequestions(this.questionobj).subscribe((res) => {
        this.tostr.success("qiestion updated..")
      }, (err) => {
        this.tostr.error("something went wrong")
      })
    }
  }
  questions: Array<any> = []
  subjects: any = []
  constructor(private aservice: AdminService, private tostr: ToastrService) {


  }
  deletequestion(questionId:number){
    alert("do you want to delete question")

    this.aservice.deletquestion(questionId).subscribe((res)=>{
      this.tostr.success("question deleted")
      this.questions = this.questions.filter(r => r.questionId != questionId)
    },(err)=>{
      this.tostr.error("something went wrong")
    })

  }
  getallquestions() {
    this.aservice.listquestions().subscribe((res) => {
      this.questions = res.data
      console.log(this.questions);
    }, (err) => {
      this.tostr.error("something went wrong")
    })
  }
  getallsubject() {
    this.aservice.Listsubject().subscribe((res) => {
      this.subjects = res.data
      console.log(this.subjects);

    }, (err) => {
      this.tostr.error("something went wrong")
    })
  }

}
