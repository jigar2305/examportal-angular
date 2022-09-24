import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-studentdashbord',
  templateUrl: './studentdashbord.component.html',
  styleUrls: ['./studentdashbord.component.css']
})
export class StudentdashbordComponent implements OnInit {
  exams: Array<any> = []
  userId:any
  constructor(private adminservice: AdminService, private tostr: ToastrService) { }

  ngOnInit(): void {
    this.getallexam()

  }
  getallexam() {
    this.userId = localStorage.getItem("userId")
    this.adminservice.listexambyid(this.userId).subscribe(res => {
      this.exams = res.data
      console.log(this.exams);

    })
  }

}
