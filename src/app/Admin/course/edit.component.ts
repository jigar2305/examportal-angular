import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-edit',
  template: `
   <div class="container">
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Update Course</h5>
            <div class="row mb-3">
              <label for="inputEmail3" class="col-sm-1 col-form-label">course</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" [(ngModel)]="course.courseName" id="inputText" />
              </div>
            </div>
            <div>
              <button type="submit" class="btn btn-primary mr-2" (click)="updatecourse()">update</button>&nbsp;
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [
  ]
})

export class EditComponent implements OnInit {
  course:any

  constructor(private adminservice: AdminService, private toster: ToastrService,private aRoute: ActivatedRoute,private rout:Router) { }

  ngOnInit(): void {
    this.adminservice.getcourse(this.aRoute.snapshot.params["courseId"]).subscribe(res=>{
      this.course = res.data
      console.log(this.course);

    },err=>{
      this.toster.error("This course Not found")
    })
  }
  updatecourse() {
    if (this.course.courseName != null) {
      this.adminservice.addcourse(this.course).subscribe(res => {
        this.toster.success("course updated..")
        this.rout.navigateByUrl("admin/course")
      }, err => {
        this.toster.error("something went wrong")
      }
      )
    }
  }

}
function course() {
  throw new Error('Function not implemented.');
}

