import { Component } from '@angular/core';
import { ColDef, ICellRendererParams, ValueGetterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Question, Subject } from 'src/app/interfaces/entity';
import { AdminService } from 'src/app/service/admin.service';
import { QuestionactionComponent } from '../question/questionaction.component';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css'],
})
export class ListQuestionComponent {
  getImage(questionId: number) {
    this.aservice.getImageByQuestionId(questionId).subscribe(res=>{
      console.log(res);

      if(res.apicode == 200){
        this.Image = res.data.imagetype+res.data.image
      }
    })
  }

  questions: Array<Question> = [];
  subjects: Array<Subject> = [];
  questionId!: number;
  count!:number
  Image:any
  constructor(private aservice: AdminService, private tostr: ToastrService) {}

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
      minWidth:400,
      maxWidth:500,
      cellRenderer: (params: ICellRendererParams) => {return params.value;}
    },
    {
      headerName: 'A',
      field: 'a',
      cellRenderer: (params: ICellRendererParams) => {return params.value;}
    },
    {
      headerName: 'B',
      field: 'b',
      cellRenderer: (params: ICellRendererParams) => {return params.value;}
    },
    {
      headerName: 'C',
      field: 'c',
      cellRenderer: (params: ICellRendererParams) => {return params.value;}
    },
    {
      headerName: 'D',
      field: 'd',
      cellRenderer: (params: ICellRendererParams) => {return params.value;}
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
      valueGetter: this.questiondetails,
      field: 'questionId',
      cellRenderer: QuestionactionComponent,
    },
  ];
  questiondetails(params: ValueGetterParams) {
    return params.data;
  }
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
    });
  }
  checkfordelete(questionId: any){
    document.getElementById("model")?.click()
    this.aservice.iscontainexamquestion(questionId).subscribe((res)=>{
      this.count = res.data
      this.questionId = questionId
    })
  }

  delete() {
      this.aservice.deletquestion(this.questionId).subscribe(
        (res) => {
          this.questions = this.questions.filter((r) => r.questionId != this.questionId);
       });
  }
}
