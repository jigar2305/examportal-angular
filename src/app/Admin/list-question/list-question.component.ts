import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
  questions: any
  constructor(private aservice: AdminService, private tostr: ToastrService) { }

  ngOnInit(): void {
  }
  getallquestions() {
    this.aservice.listquestions().subscribe((res) => {
      this.questions = res.data
    }, (err) => {
      this.tostr.error("something went wrong")
    })
  }

}
