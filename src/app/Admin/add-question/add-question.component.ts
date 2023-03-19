import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { Question, Subject } from 'src/app/interfaces/entity';
import { AdminService } from 'src/app/service/admin.service';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  questionform: FormGroup
  submitted = false;
  subject!: Subject
  subjects: Array<Subject> = []
  questions!: Question
  url!:string

  editor!: Editor;
  editor1!: Editor;
  editor2!: Editor;
  editor3!: Editor;
  editor4!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(
    private adminservice: AdminService,
    private toster: ToastrService,
  ) {
    this.questionform = new FormGroup({
      question: new FormControl('', [Validators.required]),
      a: new FormControl('', [Validators.required]),
      b: new FormControl('', [Validators.required]),
      c: new FormControl('', [Validators.required]),
      d: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();
    this.editor2 = new Editor();
    this.editor3 = new Editor();
    this.editor4 = new Editor();
    this.getallsubject()
  }
  getallsubject() {
    this.adminservice.Listsubject().subscribe(res => {
      this.subjects = res.data
    })
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
    this.editor2.destroy();
    this.editor3.destroy();
    this.editor4.destroy();
  }

  onSubmit() {
    if (this.questionform.valid && this.subject && this.subject != undefined) {
      let json = {
        question: this.questionform.value.question,
        a: this.questionform.value.a,
        b: this.questionform.value.b,
        c: this.questionform.value.c,
        d: this.questionform.value.d,
        level: this.questionform.value.level,
        correctAnswer: this.questionform.value.correctAnswer,
        url: this.url,
        subject: this.subject
      }
      console.log(json);

      this.adminservice.addquestion(json).subscribe((res)=>{
        if(res.apicode == 200){
          this.questionform.reset();
          this.url = '';
        }
      })
    }else{
      this.toster.info("please fill form correctly")
    }
  }

  convertToBase64(file: File, filename: string) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
     this.url = d
    });
  }
  onChange($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
        this.convertToBase64(file, file.name);
    }
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

}
