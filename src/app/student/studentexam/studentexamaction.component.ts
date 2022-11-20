import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { interval } from 'rxjs';

@Component({
  selector: 'app-studentexamaction',
  template: `
    <button
      class="btn btn-sm"
      *ngIf="isshow == 'start'"
      routerLink="/student/paper/{{ examId }}"
    >
      start
    </button>
    <button class="btn btn-sm" *ngIf="isshow == 'wait'">Wait</button>
    <button class="btn btn-sm" *ngIf="isshow == 'end'">end</button>
  `,
  styles: [
    `
      button {
        color: black;
        border: 1px solid black;
        background-color: gainsboro;
      }
    `,
  ],
})
export class StudentexamactionComponent
  implements OnInit, ICellRendererAngularComp {
  examId!: number;
  date!: string;
  startAt: string='wait';
  today!: string;
  endAt!: string;
  isshow!: string;
  agInit(params: ICellRendererParams<any, any>): void {
    this.examId = params.value.examId;
    this.date = params.value.date.substring(0, 10);
    this.startAt = params.value.startAt;
    this.endAt = params.value.endAt;
    this.check();
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void { }
  check() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd') as string;
    let date1 = formatDate(this.today, 'yyyy-MM-dd', 'en_US');
    let date2 = formatDate(this.date, 'yyyy-MM-dd', 'en_US');
    if (date1 < date2) {
      this.isshow = 'wait';
    } else if (date1 > date2) {
      this.isshow = 'end';
    } else {
      this.checkforstart();
      this.chekforclose();
    }
  }
  checkforstart() {
    let close = interval(2000).subscribe((x) => {
      // let currentTime = this.datePipe.transform(new Date(), 'H:mm:ss');
      // if (currentTime) {
        if (this.compareTime(this.startAt)) {
          this.isshow = 'start';
          close.unsubscribe();
        }
      // }
    });
  }
  chekforclose() {
    let close = interval(2000).subscribe((x) => {
      // let currentTime = this.datePipe.transform(new Date(), 'H:mm:ss');
      // if (currentTime) {
      //   this.compareTime(this.endAt)
      if (this.compareTime(this.endAt)) {
        this.isshow = 'end';
        close.unsubscribe();
      }
      // }
    });
  }
  compareTime(time: any): boolean {

    // let hh: Array<string> = comparetime.split(':');
    // // let h1 = hh[0] as unknown as number
    // // let h2 = hh[1] as unknown as number
    // // let h3 = hh[2] as unknown as number
    // console.log(h1 + " " + h2 + " " + h3);
    let currentTime = this.datePipe.transform(new Date(), 'HH:mm:ss') as string
    // let hh2: Array<string> = currentTime.split(':');
    // let c1 = hh2[0] as unknown as number
    // let c2 = hh2[1] as unknown as number
    // let c3 = hh2[2] as unknown as number
    // console.log(c1 + " " + c2 + " " + c3);
    let first = time.replace(':','');
    let second = currentTime.replace(':','');
    first = first.replace(':','');
    second = second.replace(':','');
    let f = first as unknown as number
    let s = second as unknown as number
    if(f < s){
      return true
    }else{
      return false;
    }







  }
}
