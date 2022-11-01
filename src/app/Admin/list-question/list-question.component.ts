import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, RowGroupingDisplayType } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { QuestionactionComponent } from '../question/questionaction.component';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css'],
})
export class ListQuestionComponent implements OnInit {

  questions: Array<any> = [];
  subjects: Array<any> = [];
  questionId!: number;
  count!:number
  constructor(private aservice: AdminService, private tostr: ToastrService) {}

  ngOnInit(): void {}
  gridApActive: any;
  searchText: any;
  // public groupDisplayType: RowGroupingDisplayType = 'groupRows';

  colDefs: ColDef[] = [
    {
      headerName: 'subjectName',
      field: 'subject.subjectName',
      minWidth:200,
    },
    {
      headerName: 'question',
      field: 'question',
      minWidth:400
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
      field: 'questionId',
      cellRenderer: QuestionactionComponent,
    },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    wrapText: true,
    autoHeight: true,
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
  checkfordelete(questionId: any){
    let e = document.getElementById("model")
    e?.click()
    console.log(e);
    this.aservice.iscontainexamquestion(questionId).subscribe((res)=>{
      this.count = res.data
      this.questionId = questionId
    },(err)=>{
      this.tostr.error('question Not found');
    })
  }

  delete() {
      this.aservice.deletquestion(this.questionId).subscribe(
        (res) => {
          this.tostr.success('question deleted');
          this.questions = this.questions.filter((r) => r.questionId != this.questionId);
        },
        (err) => {
          this.tostr.error('something went wrong');
        }
      );
  }
}
