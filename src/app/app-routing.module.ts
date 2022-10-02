import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './Admin/add-course/add-course.component';
import { AddExamComponent } from './Admin/add-exam/add-exam.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { AdminheaderComponent } from './Admin/adminheader/adminheader.component';
import { CourseComponent } from './Admin/course/course.component';
import { DashbordComponent } from './Admin/dashbord/dashbord.component';
import { ExamComponent } from './Admin/exam/exam.component';
import { ListQuestionComponent } from './Admin/list-question/list-question.component';
import { QuestionComponent } from './Admin/question/question.component';
import { SubjectComponent } from './Admin/subject/subject.component';
import { UserExamsComponent } from './Admin/user-exams/user-exams.component';
import { UserComponent } from './Admin/user/user.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './student/header/header.component';
import { PapersecondComponent } from './student/papersecond/papersecond.component';
import { ResultComponent } from './student/result/result.component';
import { ResultsComponent } from './student/results/results.component';
import { StudentComponent } from './student/student/student.component';
import { StudentdashbordComponent } from './student/studentdashbord/studentdashbord.component';

const routes: Routes = [
  {component:SignupComponent, path:"signup"},
  {component:LoginComponent, path:"login"},
  {component:ForgotpasswordComponent, path:"forgot"},
  {component:LogoutComponent, path:"logout"},

  {component:AdminComponent, path:"admin", children:[
    {component:DashbordComponent, path:"dashbord"},
    {component:CourseComponent,path:"course"},
    {component:AddCourseComponent,path:"addcourse"},
    {component:AdminheaderComponent,path:"header"},
    {component:SubjectComponent,path:"subject"},
    {component:QuestionComponent,path:"question"},
    {component:ListQuestionComponent,path:"list-question"},
    {component:ExamComponent,path:"exam"},
    {component:AddExamComponent,path:"addexam"},
    {component:UserComponent,path:"user"},
    {component:UserExamsComponent,path:"user-exams/:userId"}

  ]},
  {component:StudentComponent, path:"student", children:[
    {component:PapersecondComponent,path:"paper/:examId"},
    {component:StudentdashbordComponent, path:"dashbord"},
    {component:HeaderComponent,path:"header"},
    {component:ResultComponent,path:"result/:examId/:resultId"},
    {component:ResultsComponent,path:"results"},
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
