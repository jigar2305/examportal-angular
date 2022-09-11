import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/share.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private share:ShareService) { }
  result:any
  que:any
  ngOnInit(): void {
    this.result = this.share.getdata()
    this.que = this.share.getinfo()
  }


}
