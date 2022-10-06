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

  subjects: Array<any> = []
  constructor(private adminservice: AdminService, private toster: ToastrService) {

   }


  ngOnInit(): void {
    this.getallsubject()

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

}
