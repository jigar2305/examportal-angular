import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-files',
  templateUrl: './student-files.component.html',
  styleUrls: ['./student-files.component.css'],
})
export class StudentFilesComponent implements OnInit {
  userId: any;
  pdffiles: Array<any> = [];
  file1!: Blob;
  fileUrl: any;
  files: Array<any> = [];
  constructor(
    private sservice: StudentService,
    private tostr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.getfiles();

  }
  getsubjectlist() {
    if (this.pdffiles) {
      let subjects: Array<any> = [];

      this.pdffiles.forEach((element: any) => {
        if (!subjects.includes(element.subject.subjectName)) {
          subjects.push(element.subject.subjectName);
        }
      });
      subjects.forEach(element => {
        let array: Array<any> = [];
        this.pdffiles.forEach((pdf) => {
          if (element == pdf.subject.subjectName) {
            array.push(pdf);
          }
        })
        this.files.push({ "subject": element, "pdfs": array })
      });
    }
  }

  getfiles() {
    this.sservice.getsubjectfiles(this.userId).subscribe(
      (res) => {
        this.pdffiles = res.data;
        this.getsubjectlist();
      },
      (err) => {
        this.tostr.error('Technical error occourd');
      }
    );
  }

  onCdownload(subjectfileId: number) {
    this.sservice.getfile(subjectfileId).subscribe(
      (res) => {
        this.downloadpdf(res.data);
      },
      (err) => {

        if (err.error.msg == 'file not found') {
          this.tostr.error('file not found');
        } else {
          this.tostr.error('Technical error occourd');
        }
      }
    );
  }
  onview(subjectfileId: number) {
    this.sservice.getfile(subjectfileId).subscribe(
      (res) => {
        this.openpdf(res.data);
      },
      (err) => {

        if (err.error.msg == 'file not found') {
          this.tostr.error('file not found');
        } else {
          this.tostr.error('Technical error occourd');
        }
      }
    );
  }

  downloadpdf(File: any) {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/pdf;base64,' + File.fileString;
    downloadLink.download = File.fileName;
    downloadLink.click();
  }
  openpdf(File: any) {
    var base64 = File.fileString;
    const blob = this.base64ToBlob(base64, 'application/pdf');
    const url = URL.createObjectURL(blob);
    const pdfWindow = window.open(url);
    if (pdfWindow) {
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='" + url + "'></iframe>"
      );
    } else {
      this.tostr.error('pdf not avilable');
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
