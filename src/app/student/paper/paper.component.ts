import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css'],
})

export class PaperComponent implements OnInit {
  questions:Array<any>=[]
  examId:any
  index = 0;
  submitedquestions: Array<any>=[]
  examquestionform:FormGroup
  btnvalue:string=""

  constructor(private SService:StudentService,private aRoute: ActivatedRoute,private formBuilder: FormBuilder,) { 
    this.examquestionform = new FormGroup({
      questionId : new FormControl(),
      correctAnswer : new FormControl(),
    })
  }

  

  ngOnInit(): void {
    this.examId = this.aRoute.snapshot.params["examId"]
    this.getexamquestion(this.examId)
    this.btnvalue="next"
   
    
  }
  
  getexamquestion(examId:any){
    this.SService.getexamquestion(examId).subscribe(res=>{
      this.questions=res.data
      console.log(this.questions);
      
    })
  }
  onsubmit(){
    this.submitedquestions.push(this.examquestionform.value)
    if(this.questions.length == (this.submitedquestions.length + 1)){
      this.btnvalue = "submit"
    }else{
      this.btnvalue = "next"
    }
    this.index = this.index+1
    console.log(this.examquestionform.value);
    

  }

}
