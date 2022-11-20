import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  info: any;
  info2:any;
  examId!:number
  resultId!:number
  userId!:number
  getdata() {
    return this.info
  }
  setdata(data: any) {
    this.info = data
  }
  getinfo() {
    return this.info2
  }
  setinfo(data: any) {
    this.info2 = data
  }
  getexamId() {
    return this.examId
  }
  setexamId(examId: number) {
    this.examId = examId
  }
  getresultId() {
    return this.resultId
  }
  setresultId(resultId: number) {
    this.resultId = resultId
  }
  getuserId() {
    return this.userId
  }
  setuserId(userId: number) {
    this.userId = userId
  }

}
