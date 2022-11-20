import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ColDef,
  ICellRendererParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-examwaiting',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ examName }} result</h5>
              <div class="row mb-3 mt-3">
                <label for="search" class="col-1">&nbsp; search</label>
                <div class="col-3">
                  <input
                    type="text"
                    id="filter-text-box"
                    placeholder="Filter..."
                    [(ngModel)]="searchText"
                    (ngModelChange)="onFilterBoxChange()"
                  />
                </div>
              </div>
              <ag-grid-angular
                style="height: 500px; "
                class="ag-theme-alpine"
                [defaultColDef]="defaultColDef"
                [rowData]="status"
                [columnDefs]="colDefs"
                [suppressRowClickSelection]="true"
                [animateRows]="true"
                [pagination]="true"
                (gridReady)="onGridReady($event)"
              ></ag-grid-angular>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ExamwaitingComponent implements OnInit {
  ngOnInit(): void {}
  status: Array<any> = [];
  examName :string = ''
  constructor(private aRoute: ActivatedRoute, private aservice: AdminService) {}
  gridApActive: any;
  searchText: any;
  defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    wrapText: true,
    autoHeight: true,
    flex: 1,
    minWidth: 100,
  };
  colDefs: ColDef[] = [
    {
      headerName: 'userName',
      field: 'user.firstName',
    },
    {
      headerName: 'status',
      field: 'status',
    },
    {
      headerName: 'Status',
      field: 'result.status',
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value == 'pass') {
          return '<p style="color: green;">' + params.value + '</p>';
        } else if (params.value == 'fail') {
          return '<p style="color: red;">' + params.value + '</p>';
        }else{
          return '<b style="color: gray;"> --- </b>'
        }
      },
    },
  ];
  examIdandresultidValueGetter(params: ValueGetterParams) {
    return {
      totalMarks: params.data.totalMarks,
      obtainMarks: params.data.obtainMarks,
    };
  }

  onFilterBoxChange() {
    this.gridApActive.setQuickFilter(this.searchText);
  }
  onGridReady(params: any) {
    this.gridApActive = params.api;
    this.getresult();
  }
  getresult() {
    this.aservice.listwatching(this.aRoute.snapshot.params['examId']).subscribe(
      (res) => {
        this.status = res.data;
        this.examName =  this.status[0].result.exam.examName
      },
      (err) => {
      }
    );
  }
}
