import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../service/admin.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  dropdownList:any = [];
  dropdownSettings:any;
  users: Array<any> = []

  constructor(private adminservice: AdminService, private tostr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getuser()
    this.initDropdownSettings();
  }
  getuser() {
    this.adminservice.listuser().subscribe(res => {
      this.users = res.data
      // res.data.forEach((element: { userId: any; firstName: any; }) => {
      //   this.users.push({ item_id: element.userId, item_text: element.firstName })
      // });
      console.log(this.users);

    }, err => {
      this.tostr.error("sonething went wrong");
    })
  }
  initDropdownSettings(){
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'userId',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight : '100'
    };
  }

}
