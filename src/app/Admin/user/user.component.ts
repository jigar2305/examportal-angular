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
import { ButtoncomponentComponent } from 'src/app/buttoncomponent/buttoncomponent.component';
import { DeleteuserbuttonComponent } from 'src/app/buttoncomponent/deleteuserbutton.component';
import { UserstatusbuttonComponent } from 'src/app/buttoncomponent/userstatusbutton.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: Array<any> = [];
  userId: number = 0;

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
  gridApActive: any;
  searchText: any;



  constructor(private aservice: AdminService, private tostr: ToastrService) {}

  ngOnInit(): void {
  }

  onFilterBoxChange() {
    this.gridApActive.setQuickFilter(this.searchText);
  }

  onGridReady(params: any) {
    this.gridApActive = params.api;
    this.aservice.listuser().subscribe(
      (res) => {
        this.users = res.data;
        this.users = this.users.filter((u) => u.role.roleName != "admin");
      },
      (err) => {
        this.tostr.error('sonething went wrong');
      }
    );
  }

}
