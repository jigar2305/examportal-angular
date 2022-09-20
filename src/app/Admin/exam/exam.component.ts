import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  subjects: Array<any> = []
  examform: FormGroup
  examquestion: FormGroup
  enrollexamform: FormGroup;
  exams: Array<any> = []
  users:any = []
  examId:number=0;
  dropdownSettings:IDropdownSettings={};
  userId:Array<number>=[];


  constructor(private adminservice: AdminService, private tostr: ToastrService, private fb: FormBuilder) {
    this.examform = new FormGroup({
      subject: new FormControl([Validators.required]),
      examName: new FormControl('', [Validators.required])
    })
    this.examquestion = new FormGroup({
      number: new FormControl([Validators.required]),
      exam: new FormControl('', [Validators.required])
    }),
    this.enrollexamform = new FormGroup({
      examId: new FormControl(),
      userId: new FormControl()
    })
  }

  ngOnInit(): void {
    this.getallsubject()
    this.getallexam()
    this.getuser()
    this.dropdownSettings = {
      idField: 'userId',
      textField: 'firstName',
    };
   
  }
  getallsubject() {
    this.adminservice.Listsubject().subscribe(res => {
      this.subjects = res.data
    })
  }
  getallexam() {
    this.adminservice.listexam().subscribe(res => {
      this.exams = res.data
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
  } 
  deleteexam(examId: any) {
    this.adminservice.deleteExam(examId).subscribe(res => {
      this.tostr.success("exam deleted..")
      this.exams = this.exams.filter(r => r.examId != examId)
    }, err => {
      this.tostr.error("something went wrong")
    })
  }
  addexamquestions() {
    this.adminservice.addexamquestions(this.examquestion.value).subscribe(res => {
      this.tostr.success("questions added to exam" + this.examquestion.value.exam.examName)
    }, err => {
      this.tostr.error("something went wrong")
    })
  }
  getuser() {
    this.adminservice.listuser().subscribe(res => {
      this.users = res.data
    }, err => {
      this.tostr.error("sonething went wrong");
    })
    console.log(this.users);
    
  }
  setexamId(examId:number){
    this.examId = examId
  }
  enrollexam() {
    this.enrollexamform.value.userId.forEach((element:any) => {
      this.userId.push(element.userId)
    });
    let enroll = {
      "examId":this.examId,
      "userId": this.userId
    }
    console.log(enroll); 
  }
 
 
}
