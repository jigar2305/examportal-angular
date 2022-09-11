import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Array<any> = []
  courseform: FormGroup


  constructor(private adminservice: AdminService, private toster: ToastrService) {
    this.courseform = new FormGroup({
      courseName: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getallcourses()
  }

  getallcourses() {
    this.adminservice.Listcourse().subscribe(res => {
      console.log(res);
      this.courses = res.data
    })
  }
  deletecourse(courseId: any) {
    this.adminservice.deletecourse(courseId).subscribe(res => {
      this.toster.success("course deleted..")
      this.courses = this.courses.filter(r => r.courseId != courseId)
    }, err => {
      this.toster.error("something went wrong")
    
    })

  }
  addcourse() {
    if (this.courseform.valid) {
      this.adminservice.addcourse(this.courseform.value).subscribe(res => {
        this.toster.success("course Added..")
        this.getallcourses()
      }, err => {
        this.toster.error("something went wrong")
      }
      )
    }
  }


}
