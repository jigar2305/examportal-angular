import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-studentdashbord',
  templateUrl: './studentdashbord.component.html',
  styleUrls: ['./studentdashbord.component.css']
})
export class StudentdashbordComponent implements OnInit {

  constructor(private adminservice: AdminService, private tostr: ToastrService,private sanitizer:DomSanitizer) { }
  fileUrl:any
  
  ngOnInit(): void {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

}
