import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjectform:FormGroup
  subjects: Array<any> = []
  courses: Array<any> = []
  constructor(private adminservice: AdminService, private toster: ToastrService) {
    this.subjectform = new FormGroup({
      course: new FormControl(),
      subjectName: new FormControl('', [Validators.required])
    })
   }


  ngOnInit(): void {
    this.getallsubject()
    this.getallcourses()
  }
  getallcourses() {
    this.adminservice.Listcourse().subscribe(res => {
      this.courses = res.data
    })
  }
  getallsubject() {
    this.adminservice.Listsubject().subscribe(res => {
      this.subjects = res.data
      console.log(this.subjects);
      
    })
  }
  deletesubject(subjectId: any) {
    this.adminservice.deletesubject(subjectId).subscribe(res => {
      this.toster.success("subject deleted..")
      this.subjects = this.subjects.filter(r => r.subjectId != subjectId)
    }, err => {
      this.toster.error("something went wrong")
    })
  }
  addsubject() {
    console.log(this.subjectform.value); 
    if (this.subjectform.valid) {
      this.adminservice.addsubject(this.subjectform.value).subscribe(res => {
        this.toster.success("subject Added..")
        this.getallsubject()
      }, err => {
        this.toster.error("something went wrong")
      }
      )
    }
  }
}
