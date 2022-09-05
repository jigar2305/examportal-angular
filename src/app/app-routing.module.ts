import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Admin/admin/admin.component';
import { DashbordComponent } from './Admin/dashbord/dashbord.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {component:SignupComponent, path:"signup"},
  {component:LoginComponent, path:"login"},
  {component:ForgotpasswordComponent, path:"forgot"},
  {component:DashbordComponent, path:"dashbord"},
  {component:AdminComponent, path:"admin"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
