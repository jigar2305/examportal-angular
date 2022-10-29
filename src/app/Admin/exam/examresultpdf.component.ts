import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-examresultpdf',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ examName }} result</h5>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalDialogScrollable"
              >
                download
              </button>
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
              <div style="text-align: center; margin-bottom: 10px;">
                <a class="logo d-flex align-items-center">
                  <img src="assets/img/logo.png" alt="" />
                  <span class="d-none d-lg-block">Exam Portal</span>
                </a>
              </div>
              <h6 class="mb-2"><b>Exam :</b> {{ examName }}</h6>
              <h6 class="mb-2"><b>Total Mark :</b> {{ Total }}</h6>
              <h6 class="mb-5"><b>Passing Mark :</b> {{ passingMark }}</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">obtain Mark</th>
                    <th scope="col">result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let result of results; let i = index">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ result.user.firstName }}</td>
                    <td>{{ result.obtainMarks }}</td>
                    <td>{{ result.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" (click)="makepdf()">
                download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ExamresultpdfComponent implements OnInit {
  @ViewChild('pdf', { static: false }) pdf!: ElementRef;
  examId!: number;
  examName: string = '';
  results: Array<any> = [];
  Total!: number;
  passingMark!: number;
  constructor(
    private aRoute: ActivatedRoute,
    private aservice: AdminService,
    private tostr: ToastrService
  ) {}
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

  ngOnInit(): void {}
  getresult() {
    this.examId = this.aRoute.snapshot.params['examId'];
    this.aservice.listresults(this.examId).subscribe(
      (res) => {
        this.results = res.data;
        if (this.results.length > 0) {
          this.examName = this.results[0].exam.examName;
          this.Total = this.results[0].totalMarks;
          this.passingMark = (this.Total / 3) as number;
        }
      },
      (err) => {
        this.tostr.error('technical error occourd');
      }
    );
  }

  makepdf() {
    let doc = new jsPDF('p', 'mm', 'a4');
    let name = this.examName;
    const elementHTML: any = document.querySelector('#pdf');
    doc.html(elementHTML, {
      callback: function (doc) {
        doc.save(name + '.pdf');
      },
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 190, //target width in the PDF document
      windowWidth: 675, //window width in CSS pixels
    });
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
