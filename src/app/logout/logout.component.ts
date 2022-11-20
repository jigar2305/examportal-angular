import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from '../service/auth-token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,private authtoken:AuthTokenService,private userservice:UserService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId")
    if(userId != null){
      this.userservice.logout(userId)
    }
    this.authtoken.authToken = "";
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }

}
