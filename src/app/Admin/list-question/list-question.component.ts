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
  question: string = '';
  a: string = '';
  b: string = '';
  c: string = '';
  d: string = '';
  correctAnswer: string = '';
  level: string = '';
  questionobj: any;

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
    enablePivot: true,
    enableValue: true,
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

    });
  }



  questions: Array<any> = [];
  subjects: any = [];
  constructor(private aservice: AdminService, private tostr: ToastrService) {}

  updateondelete(questionId: number) {
    this.questions = this.questions.filter((r) => r.questionId != questionId);
  }
}
