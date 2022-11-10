import { Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from '../user.component';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-deleteuserbutton',
  template: `<i class="bi bi-trash" (click) = "delete(value)"></i>  `,
  styles: [],
})
export class DeleteuserbuttonComponent
  implements ICellRendererAngularComp
{
  value: any;
  constructor(private aservice:AdminService ,private tostr:ToastrService,private ucomponent:UserComponent) {}
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  delete(userId: number) {
    this.ucomponent.checkfordelete(userId)
  }
}
