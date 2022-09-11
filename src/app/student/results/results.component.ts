import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results:Array<any> = []
  userId:any
  constructor(private sservice:StudentService) { }

  ngOnInit(): void {
    this.getallresults()
  }
  

  getallresults(){
    this.userId = localStorage.getItem("userId")
    this.sservice.getresults(this.userId).subscribe(res=>{
      this.results = res.data
      console.log(this.results);
      

    })


  }

}
