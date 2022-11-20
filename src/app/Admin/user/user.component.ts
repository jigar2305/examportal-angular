import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { ButtoncomponentComponent } from 'src/app/Admin/user/buttoncomponent/buttoncomponent.component';
import { DeleteuserbuttonComponent } from 'src/app/Admin/user/buttoncomponent/deleteuserbutton.component';
import { UserstatusbuttonComponent } from 'src/app/Admin/user/buttoncomponent/userstatusbutton.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {

  users: Array<any> = [];
  userId!: number;
  subject: Array<any> = []
  exam: Array<any> = []
  colDefs: ColDef[] = [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'email' },
    { field: 'gender' },
    {
      headerName: 'results',
      field: 'userId',
      cellRenderer: ButtoncomponentComponent,
    },
    {
      headerName: 'action',
      field: 'userId',
      cellRenderer: DeleteuserbuttonComponent,
    },
    {
      headerName: 'activate',
      field: 'userId',
      cellRenderer: UserstatusbuttonComponent,

    },
  ];

  defaultColDef: ColDef = {
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };

  gridApActive: any;
  searchText: any;

  constructor(private aservice: AdminService, private tostr: ToastrService) { }
  onFilterBoxChange() {
    this.gridApActive.setQuickFilter(this.searchText);
  }

  onGridReady(params: any) {
    this.gridApActive = params.api;
    this.aservice.listuser().subscribe(
      (res) => {
        this.users = res.data;
        this.users = this.users.filter((u) => u.role.roleName != "admin");
      }
    );
  }
  checkfordelete(userId: any) {
    document.getElementById("model")?.click()
    this.aservice.iscontainchild(userId).subscribe((res) => {
      this.subject = res.data.subject
      this.exam = res.data.exam
      this.userId = userId
    })
  }
  deleteuser() {
    this.aservice.deleteuser(this.userId).subscribe(
      (res) => {
        this.users = this.users.filter((u) => u.userId != this.userId);
      }
    );
  }
}
