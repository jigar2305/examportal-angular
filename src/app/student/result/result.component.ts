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

  constructor(private share:ShareService,private aRoute: ActivatedRoute,private sservice:StudentService) { }
  result:any
  que:any
  examId:any
  userId:any

  ngOnInit(): void {
    this.result = this.share.getdata()
    this.que = this.share.getinfo()
    this.examId = this.aRoute.snapshot.params["examId"]
    // this.getvalue()
  }
  getvalue(){
    this.userId = localStorage.getItem("userId")
    
    this.sservice.getresult(this.userId,this.examId).subscribe(res=>{
      console.log(res);
      
    },err =>{
      console.log(err);
      
    })
    
  }


}
