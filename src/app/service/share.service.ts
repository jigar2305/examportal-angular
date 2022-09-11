import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  info: any;
  info2:any;

  constructor() { }

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

}
