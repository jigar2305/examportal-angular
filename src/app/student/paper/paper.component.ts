import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {
  questions:Array<any>=[]
  constructor(private SService:StudentService) { }

  ngOnInit(): void {
    this.getexamquestion(68)
  }
  getexamquestion(examId:any){
    console.log("exam");
    
    this.SService.getexamquestion(examId).subscribe(res=>{
      this.questions=res.data
      console.log(this.questions);
    })
  }

}
