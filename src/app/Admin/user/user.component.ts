import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
users:Array<any> = []

  constructor(private aservice:AdminService,private tostr:ToastrService) { }

  ngOnInit(): void {
    this.getuser()
  }
  getuser(){
    this.aservice.listuser().subscribe(res=>{
      this.users = res.data
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })
  }
  delete(userId:number){
     this.aservice.deleteuser(userId).subscribe((res)=>{
      this.users = this.users.filter(u =>u.userId !=userId)
      this.tostr.success("user deleted..")


     },err=>{
      this.tostr.error("something went wrong")
     })
  }
  userstatus(userId:number){
    this.aservice.userstatus(userId).subscribe((res)=>{
      this.tostr.success("user activated..")
     },err=>{
      this.tostr.error("something went wrong")
     })
  }


}
