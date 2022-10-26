import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseform: FormGroup
  constructor(private adminservice: AdminService, private toster: ToastrService,private rout:Router) {
    this.courseform = new FormGroup({
      courseName: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }
  addcourse() {
    if (this.courseform.valid) {
      this.adminservice.addcourse(this.courseform.value).subscribe(res => {
        this.toster.success("course Added..")
        this.rout.navigateByUrl("admin/course")
      }, err => {
        this.toster.error("something went wrong")
      }
      )
    }
  }

}
