import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { async, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
})
export class AddSubjectComponent implements OnInit {
  subjectform: FormGroup;
  courses: Array<any> = [];
  index: number = 0;
  uploadfile!: Observable<any>;
  course: any;
  subject!: string;
  files:Array<string> = []

  constructor(
    private adminservice: AdminService,
    private toster: ToastrService
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
    let subjectform = {
      subjectName: this.subject,
      course: this.course,

    };

    // this.adminservice.addsubject(subjectform, this.myFiles).subscribe(
    //   (res) => {
    //     this.toster.success('subject Added..');
    //   },
    //   (err) => {
    //     this.toster.error('something went wrong');
    //   }
    // );
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d)=>{
      this.uploadfile = d
      console.log(this.uploadfile);
    })

  }
  onChange($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      this.convertToBase64(file);
      console.log(this.uploadfile);
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
}
