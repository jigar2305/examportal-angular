import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  subjects: Array<any> = []
  examform: FormGroup
  examquestion:FormGroup
  exams: Array<any> = []
  constructor(private adminservice: AdminService, private tostr: ToastrService) {
    this.examform = new FormGroup({
      subject: new FormControl([Validators.required]),
      examName: new FormControl('', [Validators.required])
    })
    this.examquestion = new FormGroup({
      number: new FormControl([Validators.required]),
      exam: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getallsubject()
    this.getallexam()
  }
  getallsubject() {
    this.adminservice.Listsubject().subscribe(res => {
      this.subjects = res.data
    })
  }
  getallexam() {
    this.adminservice.listexam().subscribe(res => {
      this.exams = res.data
      console.log(this.exams);

    })
  }
  addexam() {
    if (this.examform.valid) {
      this.adminservice.addexam(this.examform.value).subscribe(res => {
        this.tostr.success("exam added..")
        this.getallexam() 
      }, err => {
        this.tostr.error("something went wrong")
      })
    }
  }deleteexam(examId:any) {
      this.adminservice.deleteExam(examId).subscribe(res => {
        this.tostr.success("exam deleted..")
        this.exams=this.exams.filter(r =>r.examId !=examId)
      }, err => {
        this.tostr.error("something went wrong")
      })
    }
    addexamquestions(){
      this.adminservice.addexamquestions(this.examquestion.value).subscribe(res => {
        this.tostr.success("questions added to exam"+this.examquestion.value.exam.examName)   
      }, err => {
        this.tostr.error("something went wrong")
      })
    }
}
