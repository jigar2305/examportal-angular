import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {

  question: string = ''
  a: string = ''
  b: string = ''
  c: string = ''
  d: string = ''
  correctAnswer: string = ''
  level: string = ''
  questionobj: any





  updatequestion(q: any) {
    this.question = q.question
    this.a = q.a
    this.b = q.b
    this.c = q.c
    this.d = q.d
    this.correctAnswer = q.correctAnswer
    this.level = q.level
    this.questionobj = q
  }
  onupdate() {
    this.questionobj.question = this.question
    this.questionobj.a = this.a
    this.questionobj.b = this.b
    this.questionobj.c = this.c
    this.questionobj.d = this.d
    this.questionobj.correctAnswer = this.correctAnswer
    this.questionobj.level = this.level
    if (this.question.length == 0 || this.a.length == 0 || this.b.length == 0 || this.c.length == 0 || this.d.length == 0 || this.correctAnswer.length == 0 || this.level.length == 0) {
      this.tostr.error("blank field not accepted..")
    } else {

      this.aservice.updatequestions(this.questionobj).subscribe((res) => {
        this.tostr.success("qiestion updated..")
      }, (err) => {
        this.tostr.error("something went wrong")
      })
    }
  }
  questions: any = []
  subjects: any = []
  constructor(private aservice: AdminService, private tostr: ToastrService) {


  }
  deletequestion(questionId:number){
    this.aservice.deletquestion(questionId).subscribe((res)=>{
      this.tostr.success("question deleted")
    },(err)=>{
      this.tostr.error("something went wrong")
    })

  }

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
  getallsubject() {
    this.aservice.Listsubject().subscribe((res) => {
      this.subjects = res.data
      console.log(this.subjects);

    }, (err) => {
      this.tostr.error("something went wrong")
    })
  }

}
