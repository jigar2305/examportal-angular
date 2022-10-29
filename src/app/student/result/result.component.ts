import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from 'src/app/service/share.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private share: ShareService, private aRoute: ActivatedRoute, private sservice: StudentService) { }
  result: any
  que: any
  examId: any
  userId: any
  resultId: any
  ngOnInit(): void {
    this.examId = this.aRoute.snapshot.params["examId"]
    this.resultId = this.aRoute.snapshot.params["resultId"]
    this.getvalue()
  }
  getvalue() {
    this.userId = localStorage.getItem("userId")

    this.sservice.getresultquestion(this.userId, this.examId).subscribe(res => {
      this.que = res.data

    }, err => {


    })
    this.sservice.getresult(this.resultId).subscribe(res => {
      this.result = res.data

    }, err => {



    })

  }


}
