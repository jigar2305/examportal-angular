import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { async, Observable, Subscriber } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { DeletefileComponent } from './deletefile.component';

@Component({
  selector: 'app-editsubject',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Update subject</h5>
              <div class="row mb-3">
                <label for="inputEmail" class="col-sm-2 col-form-label"
                  >course</label
                >
                <div class="col-sm-10">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    [(ngModel)]="subject.course"
                  >
                    <option selected="" [ngValue]="subjectcourse">
                      {{ subjectcourse.courseName }}
                    </option>
                    <option *ngFor="let i of courses" [ngValue]="i">
                      {{ i.courseName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >subject</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="subject.subjectName"
                    id="inputText"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >select files</label
                >
                <div class="col-sm-10">
                  <input
                    type="file"
                    id="fileinput"
                    class="form-control"
                    (change)="onChange($event)"
                    accept="application/pdf"
                  />
                  <div
                    *ngIf="files.length > 0"
                    style="border: 1px solid black; border-radius: 10px;"
                    class="mt-2 p-2"
                  >
                    <div *ngFor="let i of files" class="row">
                      <div class="col-sm-9">
                        <p style="overflow:auto;">{{ i.fileName }}</p>
                      </div>
                      <div class="col-sm-3">
                        <button
                          class="btn btn-danger btn-sm"
                          type="button"
                          (click)="removefile(i.fileName)"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-5">
                <button
                  type="submit"
                  class="btn btn-primary mr-2"
                  (click)="updatesubject()"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">File list</h5>
              <div class="row mb-3 mt-3">
                <label for="search" class="col-2">&nbsp; search</label>
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
export class EditsubjectComponent implements OnInit {
  subject: any;
  courses: Array<any> = [];
  files: Array<any> = [];
  filename!: string;
  subjectcourse!: any;
  showfiles: Array<any> = [];

  constructor(
    private adminservice: AdminService,
    private toster: ToastrService,
    private aRoute: ActivatedRoute,
    private rout: Router
  ) {}

  ngOnInit(): void {
    this.adminservice
      .getsubject(this.aRoute.snapshot.params['subjectId'])
      .subscribe(
        (res) => {
          this.subject = res.data;
          this.subjectcourse = res.data.course;
          this.adminservice.Listcourse().subscribe((res) => {
            this.courses = res.data;
            this.courses = this.courses.filter(
              (c) => c.courseId != this.subjectcourse.courseId
            );
          });
        },
        (err) => {
          this.toster.error('This subject Not found');
        }
      );
  }
  updatesubject() {
    if (
      this.subject.course == null ||
      this.subject == null ||
      this.subject.subjectName == null ||
      this.subject.subjectName.length == 0 ||
      this.subject.length == 0
    ) {
      this.toster.info('please fill form correctly');
    } else {
      let subjectform = {
        subject: this.subject,
        files: this.files,
      };
      this.adminservice.updatesubject(subjectform).subscribe(
        (res) => {
          this.getfiles()
          this.files = []
          this.toster.success('subject updated..');
        },
        (err) => {
          this.toster.error('something went wrong');
        }
      );
    }
  }
  convertToBase64(file: File, filename: string) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      let file = { fileString: d, fileName: filename };
      this.files.push(file);
    });
  }
  onChange($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      let filesize = file.size;

      if (file.type != 'application/pdf') {
        this.toster.info('only accept pdf');
      }
      // if(filesize > (1024*20)) {
      //   this.toster.info('pdf size should be less than 20Mb');
      // }
      if (file.type == 'application/pdf') {
        this.convertToBase64(file, file.name);
      }
    }
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  removefile(fileName: string) {
    this.files = this.files.filter((u) => u.fileName != fileName);
  }

  gridApActive: any;
  searchText: any;
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
  colDefs: ColDef[] = [
    {
      headerName: 'PDF Name',
      field: 'fileName',
    },
    {
      headerName: 'Action',
      field: 'subjectfileId',
      minWidth:60,
      maxWidth:100,
      cellRenderer: DeletefileComponent,
    },
  ];
  deletefileremove(subjectfileId: number) {
    this.showfiles = this.showfiles.filter((s) => s.subjectfileId != subjectfileId)
  }
  onFilterBoxChange() {
    this.gridApActive.setQuickFilter(this.searchText);
  }
  onGridReady(params: any) {
    this.gridApActive = params.api;
    this.getfiles()
  }
  getfiles(){
    this.adminservice
      .getsubjectfile(this.subject.subjectId)
      .subscribe((res) => {
        this.showfiles = res.data;
      });
  }
}
