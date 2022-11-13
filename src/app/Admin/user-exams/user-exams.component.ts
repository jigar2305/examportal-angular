import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { StudentService } from 'src/app/service/student.service';
import { UserExamActionComponent } from './user-exam-action/user-exam-action.component';

@Component({
  selector: 'app-user-exams',
  templateUrl: './user-exams.component.html',
  styleUrls: ['./user-exams.component.css']
})
export class UserExamsComponent {
  userId: number = 0;
  results: Array<any> = []
  constructor(private aRoute: ActivatedRoute, private sservice: StudentService) { }
  colDefs: ColDef[] = [
    {
      headerName: 'Exam',
      field: 'exam.examName',
    },
    {
      headerName: 'result',
      field: 'status',
    },
    {
      headerName: 'action',
      cellRenderer: UserExamActionComponent,
      valueGetter: this.examIdandresultidValueGetter,
    },
  ];

  examIdandresultidValueGetter(params: ValueGetterParams) {
    return {examId:params.data.exam.examId,resultId:params.data.resultId,userId:params.data.user.userId};
  }

  defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
    wrapText: true,
    autoHeight: true,
  };

  gridApActive: any;
  searchText: any;
  onFilterBoxChange() {
    this.gridApActive.setQuickFilter(this.searchText);
  }
  onGridReady(params: any) {
    this.gridApActive = params.api;
    this.userId = this.aRoute.snapshot.params["userId"]
    this.sservice.getresults(this.userId).subscribe(res => {
      this.results = res.data
      console.log(this.results);
    })
  }
}
