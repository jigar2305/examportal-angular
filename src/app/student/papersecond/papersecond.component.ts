import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from 'src/app/service/share.service';
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
  que: Array<question> = [];
  time: any;
  issubmit:boolean = false;

  constructor(
    private SService: StudentService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private toster:ToastrService
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
      let exam = res.data;
      this.time = exam.time;
    });
    this.SService.getquestion(examId).subscribe((res) => {
      this.que = res.data;

      this.que.forEach((element) => {
        element['selected'] = '';
      });
    });
  }

  onsubmit() {
    if (this.btnvalue == 'submit') {
      this.submit();
    }

    if (this.que.length == this.index + 1) {
      this.btnvalue = 'submit';
    } else {
      this.btnvalue = 'next';
      this.index = this.index + 1;
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
    this.SService.submitquestion(answers).subscribe(
      (res) => {
        this.router.navigateByUrl('/student/results');
        this.issubmit = true
      }
    );
  }
}
class question {
  a!: string;
  b!: string;
  c!: string;
  correctAnswer!: string;
  d!: string;
  level!: string;
  question!: string;
  questionId!: number;
  selected!: string;
  subject!: any;
}
