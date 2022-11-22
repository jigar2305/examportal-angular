import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ColDef,
  ICellRendererParams,
  ValueGetterParams,
} from 'ag-grid-community';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-examresultpdf',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <h5 class="card-title">{{ examName }} result</h5>
                </div>
                <div class="col-6" style="text-align: end;">
                  <button type="button" data-bs-toggle="modal" class="mt-3" data-bs-target="#modalDialogScrollable"> download </button>
              </div>
              </div>
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
                [rowData]="results"
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

    <div
      class="modal fade"
      id="modalDialogScrollable"
      tabindex="-1"
      style="display: none;"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ examName }} result</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container" id="pdf" #pdf>
              <div id="ppt" #ppt>
              <div style="text-align: center; margin-bottom: 10px;">
                <a class="logo d-flex align-items-center">
                  <img src="assets/img/logo.png" alt="" />
                  <span class="d-none d-lg-block">Exam Portal</span>
                </a>
              </div>
              <h6 class="mb-2"><b>Exam :</b> {{ examName }}</h6>
              <h6 class="mb-2"><b>Total Mark :</b> {{ Total }}</h6>
              <h6 class="mb-2"><b>Passing Mark :</b> {{ passingMark }}</h6>
              <h6 class="mb-5"><b>Exam Date :</b> {{ ExamDate }}</h6>
              </div>
              <table class="table table-striped" id="table" #table>
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Total Marks</th>
                    <th scope="col">Obtain Mark</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let result of results; let i = index">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ result.user.firstName }}</td>
                    <td>{{ result.totalMarks }}</td>
                    <td>{{ result.obtainMarks }}</td>
                    <td>{{ result.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" (click)="makepdf()">  pdf&nbsp;<em class="bi bi-download " ></em></button>
              <button type="button" class="btn btn-primary" (click)="excel()">  excel&nbsp;<em class="bi bi-download " ></em></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ExamresultpdfComponent {
  @ViewChild('pdf', { static: false }) pdf!: ElementRef;
  @ViewChild('ppt', { static: false }) ppt!: ElementRef;
  @ViewChild('table', { static: false }) table!: ElementRef;
  examId!: number;
  examName: string = '';
  results: Array<any> = [];
  Total!: number;
  passingMark!: number;
  ExamDate!:string
  constructor(
    private aRoute: ActivatedRoute,
    private aservice: AdminService,
    private tostr: ToastrService
  ) { }
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
      headerName: 'Total marks',
      field: 'totalMarks',
    },
    {
      headerName: 'Obtain Marks',
      field: 'obtainMarks',
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value == 'pass') {
          return '<p style="color: green;">' + params.value + '</p>';
        } else {
          return '<p style="color: red;">' + params.value + '</p>';
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
    this.examId = this.aRoute.snapshot.params['examId'];
    this.aservice.listresults(this.examId).subscribe(
      (res) => {
        this.results = res.data;
        if (this.results.length > 0) {
          this.examName = this.results[0].exam.examName;
          this.Total = this.results[0].totalMarks;
          let percentage = this.results[0].exam.percentage
          let passing = (this.Total*percentage)/100
          this.passingMark = Math.floor(passing);
          this.ExamDate = this.results[0].exam.date;
        }
      }
    );
  }

  makepdf() {
    let doc = new jsPDF('p', 'mm', 'a4');
    let name = this.examName;
    const elementHTML: any = document.querySelector('#ppt');
    doc.html(elementHTML, {
      callback: function (doc: any) {
        autoTable(doc, { html: '#table',margin: {top: 55} })
        doc.save(name + '.pdf');
      },
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 190,
      windowWidth: 675,
    });
  }
  excel() {
    if (this.examName != null) {
      let element = document.getElementById('table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      let name = this.examName + '.xlsx'

      /* save to file */
      XLSX.writeFile(wb, name);
    }
  }























  // pdf()
  // {
  //   const head = [['No.', 'Name', 'obtain Mark', 'result']]
  //   const data = []
  //   for (let index = 0; index < this.results.length; index++) {
  //     const result = this.results[index];
  //     data.push([index+1,result.user.firstName,result.obtainMarks,result.status])
  //   }
  //   let doc = new jsPDF('p','pt','a4',);
  //   let name = this.examName
  //   const elementHTML:any = document.querySelector("#pdf");
  //   doc.text(name,20,200)
  //   autoTable(doc, {
  //     head: head,
  //     body: data,
  //     didDrawCell: (data) => {

  //     },

  // });
  //   doc.save('table.pdf');
  // }

}
