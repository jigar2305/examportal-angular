import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-studentdashbord',
  templateUrl: './studentdashbord.component.html',
  styleUrls: ['./studentdashbord.component.css']
})
export class StudentdashbordComponent implements OnInit {
  exams: Array<any> = []
  constructor(private adminservice: AdminService, private tostr: ToastrService) { }

  ngOnInit(): void {
    this.getallexam()

  }
  getallexam() {
    this.adminservice.listexam().subscribe(res => {
      this.exams = res.data
      console.log(this.exams);

    })
  }

}
