import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Array<any> = []

  constructor(private aservice: AdminService, private tostr: ToastrService) { }

  ngOnInit(): void {
    this.getuser()
  }
  getuser() {
    this.aservice.listuser().subscribe(res => {
      this.users = res.data

    }, err => {
      this.tostr.error("sonething went wrong");
    })
  }
  delete(userId: number) {
    this.aservice.deleteuser(userId).subscribe((res) => {
      this.users = this.users.filter(u => u.userId != userId)
      this.tostr.success("user deleted..")
    }, err => {
      this.tostr.error("something went wrong")
    })
  }
  userstatus(userId: number) {
    this.aservice.userstatus(userId).subscribe((res) => {
      this.getuser();
      if (res.data == true) {
        this.tostr.success("user activated..")
      } else {
        this.tostr.success("user Deactivated..")
      }
    }, err => {
      this.tostr.error("something went wrong")
    })
  }


}
