import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionform: FormGroup
  subjectform: FormGroup
  submitted = false;
  subject: any
  file!: File;
  exceltype:String="application/vnd.ms-excel,application/msexcel,application/x-msexcel,application/x-ms-excel,application/x-excel,application/x-dos_ms_excel,application/xls,application/x-xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  subjects: Array<any> = []
  questions: Array<any> = []
  constructor(private formBuilder: FormBuilder, private adminservice: AdminService, private tostr: ToastrService,private rout:Router) {
    this.questionform = this.formBuilder.group({
      Numberofquestion: ['', Validators.required],
      question: new FormArray([])
    })
    this.subjectform = new FormGroup({
      subject: new FormControl([Validators.required])
    })
  }

  onChange(event:any) {
    this.file = event.target.files[0];
  }

  get f() { return this.questionform.controls; }
  get t() {
    return this.questionform.controls['question'] as FormArray
  }
  get questionFormGroups() { return this.t.controls as FormGroup[]; }

  ngOnInit(): void {
    this.getallsubject()
  }
  getallsubject() {
    this.adminservice.Listsubject().subscribe(res => {
      this.subjects = res.data
    })
  }

  onUpload() {
    this.adminservice.addquestionsbyexcel(this.file).subscribe(
        (event: any) => {
          this.tostr.success("question added....")
          this.rout.navigateByUrl('/admin/list-question')
        }
    );
}

  onChangequestion(e: any) {
    const numberOfquestions = e.target.value || 0;
    if (this.t.length < numberOfquestions) {
      for (let i = this.t.length; i < numberOfquestions; i++) {
        this.t.push(this.formBuilder.group({
          question: ['', Validators.required],
          a: ['', Validators.required],
          b: ['', Validators.required],
          c: ['', Validators.required],
          d: ['', Validators.required],
          level: ['', Validators.required],
          correctAnswer: ['', Validators.required],
          subject: [this.subject]
        }))

      }
    } else {
      for (let i = this.t.length; i >= numberOfquestions; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

      if (this.subject == null) {
        this.tostr.warning("please select subject")
      }
    if (this.questionform.invalid) {
      this.tostr.warning("please fill form correctly")
    }
    if (this.questionform.valid) {
      this.adminservice.addquestions(this.questionform.value.question).subscribe(res => {
        this.tostr.success("questions added successfully")
        this.onClear()
        this.rout.navigateByUrl('/admin/list-question')
      }, err => {

        this.tostr.error("somethin went wrong")
      })
    }
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.questionform.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }
  getallquestions() {
    this.adminservice.listquestions().subscribe(res => {
      this.questions = res.data
    })
  }

}
