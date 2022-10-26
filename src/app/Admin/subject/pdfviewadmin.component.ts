import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { PdfviewactionComponent } from './pdfviewaction.component';

@Component({
  selector: 'app-pdfviewadmin',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ subject }} PDF list</h5>
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
                [rowData]="showfiles"
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
export class PdfviewadminComponent implements OnInit {
  subject: any;
  onClick(subjectfileId: number) {
    this.adminservice.getfile(subjectfileId).subscribe(
      (res) => {
        this.downloadpdf(res.data);
      },
      (err) => {
        console.log(err);
        if (err.error.msg == 'file not found') {
          this.toster.error('file not found');
        } else {
          this.toster.error('Technical error occourd');
        }
      }
    );
  }

  onview(subjectfileId: number) {
    this.adminservice.getfile(subjectfileId).subscribe(
      (res) => {
        this.openpdf(res.data);
      },
      (err) => {
        console.log(err);
        if (err.error.msg == 'file not found') {
          this.toster.error('file not found');
        } else {
          this.toster.error('Technical error occourd');
        }
      }
    );
  }

  showfiles: Array<any> = [];

  constructor(
    private adminservice: AdminService,
    private toster: ToastrService,
    private aRoute: ActivatedRoute,
    private rout: Router
  ) {}

  ngOnInit(): void {}
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
      headerName: 'PDF Name',
      field: 'fileName',
    },
    {
      headerName: 'Action',
      field: 'subjectfileId',
      cellRenderer: PdfviewactionComponent,
    },
  ];
  deletefileremove(subjectfileId: number) {
    this.showfiles = this.showfiles.filter(
      (s) => s.subjectfileId != subjectfileId
    );
  }
  onFilterBoxChange() {
    this.gridApActive.setQuickFilter(this.searchText);
  }
  onGridReady(params: any) {
    this.gridApActive = params.api;
    this.adminservice
      .getsubjectfile(this.aRoute.snapshot.params['subjectId'])
      .subscribe((res) => {
        this.showfiles = res.data;
        this.subject = this.showfiles[0].subject.subjectName;
        console.log(this.showfiles);
      });
  }
  downloadpdf(File: any) {
    const downloadLink = document.createElement('a');
    downloadLink.href = "data:application/pdf;base64,"+File.fileString;
    downloadLink.download = File.fileName;
    downloadLink.click();
  }
  openpdf(File: any) {
    // const blob = new Blob([File.fileString],{ type: 'application/pdf' })
    // const url= window.URL.createObjectURL(blob);
    // window.open(url);
    var base64 = File.fileString;
    const blob = this.base64ToBlob(base64, 'application/pdf');
    const url = URL.createObjectURL(blob);
    const pdfWindow = window.open(url);
    if (pdfWindow) {
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='" + url + "'></iframe>"
      );
    }else{
      this.toster.error("pdf not avilable")
    }
  }
  base64ToBlob(base64: string, type = 'application/pdf') {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type });
  }
}
