import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { ShareService } from 'src/app/service/share.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-papersecond',
  templateUrl: './papersecond.component.html',
  styleUrls: ['./papersecond.component.css']
})
export class PapersecondComponent implements OnInit {

  examId: any
  Id: number = 0;
  index = 0;
  submitedquestions: Array<any> = []
  btnvalue: string = ""
  que: Array<any> = [];

  time: number = (this.que.length * 30)




  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.submit()
    }
  }


  constructor(private SService: StudentService, private aRoute: ActivatedRoute, private share: ShareService, private router: Router) {

  }



  ngOnInit(): void {
    this.examId = this.aRoute.snapshot.params["examId"]
    this.getque(this.examId)
    this.time = (this.que.length * 30);
    this.btnvalue = "next"
  }
  getque(examId: any) {
    this.SService.getquestion(examId).subscribe(res => {
      this.que = res.data
      console.log(this.que);
      this.time = (this.que.length * 30);
      this.que.forEach(element => {
        element['selected'] = ""
      });
    })
  }

  onsubmit() {
    if (this.btnvalue == "submit") {
      this.submit()
    }

    if (this.que.length == (this.index + 1)) {
      this.btnvalue = "submit"
    } else {
      this.btnvalue = "next"
      this.index = this.index + 1
    }

  }

  previous(index: number) {
    console.log(index);
    if (index != 0) {
      this.index = index - 1
      this.btnvalue = "next"
    }
  }
  submit() {
    let email = localStorage.getItem("email")
    let answers = {
      "email": email,
      "questions": this.que,
      "exam": {
        "examId": this.examId
      }
    }
    this.SService.submitquestion(answers).subscribe(res => {
      this.share.setdata(res.data)
      this.share.setinfo(this.que)
      this.router.navigateByUrl("/student/results")
    }, err => {
      console.log(err);
    })
  }




}
