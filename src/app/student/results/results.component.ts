import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { StudentService } from 'src/app/service/student.service';
import { ResultsactionComponent } from './resultsaction.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results:Array<any> = []
  userId:any
  examId:any
  constructor(private sservice:StudentService) { }

  ngOnInit(): void {

  }
  colDefs: ColDef[] = [
    {
      headerName: 'examName',
      field: 'exam.examName',
    },

    {
      headerName: 'Action',
      valueGetter: this.examIdandresultidValueGetter,
      cellRenderer: ResultsactionComponent,
    },
  ];
  examIdandresultidValueGetter(params: ValueGetterParams) {
    return {examId:params.data.exam.examId,resultId:params.data.resultId};
  }
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
    this.userId = localStorage.getItem("userId")
    this.sservice.getresults(this.userId).subscribe(res=>{
      this.results = res.data
    })
  }



}
