import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
  questions: any = []
  subjects: any = []
  constructor(private aservice: AdminService, private tostr: ToastrService) { }

  ngOnInit(): void {
    this.getallquestions()
    this.getallsubject()
  }
  getallquestions() {
    this.aservice.listquestions().subscribe((res) => {
      this.questions = res.data
      console.log(this.questions);
      
    }, (err) => {
      this.tostr.error("something went wrong")
    })
  }
  getallsubject(){
    this.aservice.Listsubject().subscribe((res)=>{
      this.subjects = res.data
      console.log(this.subjects);
      
    }, (err) => {
      this.tostr.error("something went wrong")
    })
  }

}
