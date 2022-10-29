import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from '../Admin/user/user.component';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-userstatusbutton',
  template: `<button type="button" class="btn btn-sm btn-primary"(click)="userstatus(value)">{{str}}</button> `,
  styles: [`
    button{
      width : 70px
    }`
  ],
})
export class UserstatusbuttonComponent
  implements OnInit, ICellRendererAngularComp
{
  user: any;
  value: any;
  str: string = '';
  constructor(private aservise: AdminService, private tostr: ToastrService,private router: Router,private ucomponent:UserComponent) {}
  userstatus(userId: number) {
    this.aservise.userstatus(userId).subscribe(
      (res) => {
        if (res.data == true) {
          this.tostr.success('user activated..');
          // this.ucomponent.changestatus(userId)
          this.setstatus()
        } else {
          this.tostr.success('user Deactivated..');
          this.setstatus()
        }
      },
      (err) => {
        this.tostr.error('something went wrong');
      }
    );
  }
  setstatus(){
    this.aservise.finduser(this.value).subscribe((res) => {
      this.user = res.data;
      if(this.user.active == true){
        this.str = "Active"
      }else{
        this.str = "Deactive"
      }
    });
  }

  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value;
    this.setstatus()
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  ngOnInit(): void {}
}
