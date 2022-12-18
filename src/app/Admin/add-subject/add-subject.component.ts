import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { async, Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
})
export class AddSubjectComponent implements OnInit {
  subjectform: FormGroup;
  courses: Array<any> = [];
  index: number = 0;

  course: any;
  subject!: string;
  files: Array<any> = [];
  filename!: string;
  _ = require('lodash');

  constructor(
    private adminservice: AdminService,
    private toster: ToastrService,
    private rout:Router
  ) {
    this.subjectform = new FormGroup({
      course: new FormControl(),
      subjectName: new FormControl('', [Validators.required]),
    });
  }
  getallcourses() {
    this.adminservice.Listcourse().subscribe((res) => {
      this.courses = res.data;
    });
  }

  ngOnInit(): void {
    this.getallcourses();
  }
  addsubject() {
    if(this.course == null || this.subject == null || this.subject.length == 0){
      this.toster.info("please fill form correctly")
    }else{
    let subjectform = {
      subject: {
        subjectName: this.subject,
        course: this.course,
      },
      files: this.files,
    };
    this.adminservice.addsubject(subjectform).subscribe(
      (res) => {
        if(res.apicode == 200){
          this.rout.navigateByUrl('admin/subject')
        }
      });
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
      if (file.type != 'application/pdf') {
        this.toster.info('only accept pdf');
      }
      // let filesize = file.size;
      // if(filesize > (1024*20)) {
      //   this.toster.info('pdf size should be less than 20Mb');
      // }
      let i = true
      this.files.forEach((e)=>{
        if(e.fileName == file.name){
          i = false
        }
      })
      if (file.type == 'application/pdf' && i) {
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
}
