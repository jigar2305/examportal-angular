import { Component, OnInit } from '@angular/core';
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  HeaderCheckboxSelectionCallbackParams,
  ICellRendererParams,
} from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit,ICellRendererAngularComp {
  users: Array<any> = [];
  userId:number = 0

  colDefs: ColDef[] = [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'email' },
    { field: 'gender' },
    {
      headerName: 'results',
      field: 'userId',
      cellRenderer: function(params:any) {
        return '<a  routerLink="/admin/dashbord" >'+ params.value+'</a>'
      }
    },
    {
      headerName: 'action',
      field: 'userId',
      cellRenderer: function (params: any) {
        return (
          '<button (click) = "delete(' +
          params.value +
          ')"><i class="bi bi-trash" ></i></button>'
        );
      },
    },
  ];
  customCellRendererFunc(params: any): string {
    const cellContent = `<a [routerLink]="['/leverance/detail', 13]">A new link</a>`;
    return cellContent;
  }
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
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';

  checkboxSelection = function (params: CheckboxSelectionCallbackParams) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
  };
  headerCheckboxSelection = function (
    params: HeaderCheckboxSelectionCallbackParams
  ) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
  };

  agInit(params: ICellRendererParams<any, any>): void {
    this.userId = params.value
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }





















  constructor(private aservice: AdminService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.getuser();
  }
  getuser() {
    this.aservice.listuser().subscribe(
      (res) => {
        this.users = res.data;
        console.log(this.users);
      },
      (err) => {
        this.tostr.error('sonething went wrong');
      }
    );
  }
  delete(userId: number) {
    this.aservice.deleteuser(userId).subscribe(
      (res) => {
        this.users = this.users.filter((u) => u.userId != userId);
        this.tostr.success('user deleted..');
      },
      (err) => {
        this.tostr.error('something went wrong');
      }
    );
  }
  userstatus(userId: number) {
    this.aservice.userstatus(userId).subscribe(
      (res) => {
        this.getuser();
        if (res.data == true) {
          this.tostr.success('user activated..');
        } else {
          this.tostr.success('user Deactivated..');
        }
      },
      (err) => {
        this.tostr.error('something went wrong');
      }
    );
  }
}
