import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin.service';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionform: FormGroup
  subjectform: FormGroup
  submitted = false;
  subject:any 
  subjects:Array<any>=[]
  questions:Array<any>=[]
  constructor(private formBuilder: FormBuilder,private adminservice:AdminService,private tostr:ToastrService) {
    this.questionform = this.formBuilder.group({
      Numberofquestion: ['', Validators.required],
      question: new FormArray([])
    })
    this.subjectform = new FormGroup({
      subject: new FormControl( [Validators.required])
    })
    
  }

  get f() { return this.questionform.controls; }
  get t() {
    return this.questionform.controls['question'] as FormArray
  }
  get questionFormGroups() { return this.t.controls as FormGroup[]; }

  ngOnInit(): void {
    this.getallsubject()
  }
  subjectvalue(){

    console.log(this.subjectform.value);

  }

  getallsubject() {
    this.adminservice.Listsubject().subscribe(res => {
      this.subjects = res.data
    })
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
          correctAnswer: ['', Validators.required],
          subject: [this.subjectform.value.subject]
        }))
       
      }
    } else {
      for (let i = this.t.length; i >= numberOfquestions; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    console.log(JSON.stringify((this.subject)));
    this.submitted = true;

    console.log(this.questionform.value+
      JSON.stringify(this.questionform.value));
    
    if (this.questionform.invalid) {
      return;
    }
    if(this.questionform.valid){
      this.adminservice.addquestions(this.questionform.value.question).subscribe(res=>{
        console.log(res);
        this.tostr.success("questions added successfully")
        
      },err=>{
        console.log(err);
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
  getallquestions(){
    this.adminservice.listquestions().subscribe(res=>{
      this.questions = res.data
    })
  }

}
