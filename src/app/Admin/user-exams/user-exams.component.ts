import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-user-exams',
  templateUrl: './user-exams.component.html',
  styleUrls: ['./user-exams.component.css']
})
export class UserExamsComponent implements OnInit {
  userId: number = 0;
  results: Array<any> = []
  result: any
  que: any
  examId: any
  resultId: any
  constructor(private aRoute: ActivatedRoute, private sservice: StudentService) { }

  ngOnInit(): void {
    this.getallresults()
  }
  getallresults() {
    this.userId = this.aRoute.snapshot.params["userId"]
    this.sservice.getresults(this.userId).subscribe(res => {
      this.results = res.data
      console.log(this.results);
      
    })
  }

  
  
  setvalue(examId:number,resultId:number){
    console.log(examId,resultId);
    this.userId = this.aRoute.snapshot.params["userId"]
    
    this.sservice.getresultquestion(this.userId, examId).subscribe(res => {
      console.log("hello");
      console.log(res);
      this.que = res.data
    }, err => {
      console.log(err);
    
    })
    this.sservice.getresult(resultId).subscribe(res => {
      console.log(res);
      this.result = res.data
    
    }, err => {
      console.log(err);
      
    
    })
  }


}
