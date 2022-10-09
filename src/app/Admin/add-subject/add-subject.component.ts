import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
})
export class AddSubjectComponent implements OnInit {
  subjectform: FormGroup;
  courses: Array<any> = [];
  myFiles: Array<File> = [];
  index:number= 0
  file!: File;
  course:any
  subject!:string


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
    // if (this.subjectform.valid) {
      let subjectform = {
        "subjectName": this.subject,
        "course":this.course
      };
      console.log(subjectform);
      this.myFiles.push(this.file)


      this.adminservice.addsubject(subjectform,this.myFiles).subscribe(
        (res) => {
          this.toster.success('subject Added..');
        },
        (err) => {
          this.toster.error('something went wrong');
        }
      );
    // }
  }
  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      this.index = this.index +1
    }
  }
}
