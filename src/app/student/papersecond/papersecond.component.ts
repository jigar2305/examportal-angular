import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { Exam, Question } from 'src/app/interfaces/entity';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-papersecond',
  templateUrl: './papersecond.component.html',
  styleUrls: ['./papersecond.component.css'],
})
export class PapersecondComponent implements OnInit, OnDestroy {
  examId: any;
  Id: number = 0;
  index = 0;
  submitedquestions: Array<any> = [];
  btnvalue: string = '';
  que: Array<Question> = [];
  time: any;
  issubmit:boolean = false;
  exam!:Exam

  constructor(
    private SService: StudentService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {}
  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.submit();
    }
  }

  ngOnDestroy(): void {
    if(!this.issubmit){
      this.submit();
    }
  }

  ngOnInit(): void {
    this.examId = this.aRoute.snapshot.params['examId'];
    this.getque(this.examId);
    this.btnvalue = 'next';
  }
  getque(examId: any) {
    this.SService.getexambyid(examId).subscribe((res) => {
      if(res.apicode == 200){
        this.exam = res.data;
        this.time = this.exam.time;
      }
    });
    this.SService.getquestion(examId).subscribe((res) => {
      if(res.apicode == 200){
        this.que = res.data;
        this.que.forEach((element) => {
          element['selected'] = '';
        });
      }
    });
  }

  onsubmit() {
    if (this.btnvalue == 'submit') {
      this.submit();
    }else{
      if (this.que.length == this.index + 1) {
        this.btnvalue = 'submit';
      } else {
        this.btnvalue = 'next';
        this.index = this.index + 1;
      }
    }
  }
  previous(index: number) {
    if (index != 0) {
      this.index = index - 1;
      this.btnvalue = 'next';
    }
  }
  submit() {
    let email = localStorage.getItem('email');
    let answers = {
      email: email,
      questions: this.que,
      exam: {
        examId: this.examId,
      },
    };
    // this.SService.submitquestion(answers).subscribe(
    //   (res) => {
    //     if(res.apicode == 200){
    //       this.router.navigateByUrl('/student/results');
    //       this.issubmit = true
    //     }
    //   }
    // );
  }
}

