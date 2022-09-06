import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Admin/admin/admin.component';
import { AdminheaderComponent } from './Admin/adminheader/adminheader.component';
import { CourseComponent } from './Admin/course/course.component';
import { DashbordComponent } from './Admin/dashbord/dashbord.component';
import { QuestionComponent } from './Admin/question/question.component';
import { SubjectComponent } from './Admin/subject/subject.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {component:SignupComponent, path:"signup"},
  {component:LoginComponent, path:"login"},
  {component:ForgotpasswordComponent, path:"forgot"},
  {component:AdminComponent, path:"admin", children:[
    {component:DashbordComponent, path:"dashbord"},
    {component:CourseComponent,path:"course"},
    {component:AdminheaderComponent,path:"header"},
    {component:SubjectComponent,path:"subject"},
    {component:QuestionComponent,path:"question"},

  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
