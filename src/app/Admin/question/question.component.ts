import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionform: FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.questionform = this.formBuilder.group({
      Numberofquestion: ['', Validators.required],
      questions: new FormArray([])
    })
  }

  get f() { return this.questionform.controls; }
  get t() {
    return this.questionform.controls['questions'] as FormArray
  }
  get questionFormGroups() { return this.t.controls as FormGroup[]; }

  ngOnInit(): void {
  }
  addquestion() {

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
          subject: ['']
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

    // stop here if form is invalid
    if (this.questionform.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.questionform.value, null, 4));
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

}
