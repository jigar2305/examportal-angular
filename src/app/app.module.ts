import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {DialogModule} from 'primeng/dialog';
import { DashbordComponent } from './Admin/dashbord/dashbord.component';
import { AdminheaderComponent } from './Admin/adminheader/adminheader.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { CourseComponent } from './Admin/course/course.component';
import { FooterComponent } from './footer/footer.component';
import { SubjectComponent } from './Admin/subject/subject.component';
import { QuestionComponent } from './Admin/question/question.component';
import { HeaderComponent } from './student/header/header.component';
import { StudentComponent } from './student/student/student.component';
import { StudentdashbordComponent } from './student/studentdashbord/studentdashbord.component';
import { ExamComponent } from './Admin/exam/exam.component';
import { PapersecondComponent } from './student/papersecond/papersecond.component';
import { ResultComponent } from './student/result/result.component';
import { LogoutComponent } from './logout/logout.component';
import { CountdownModule } from 'ngx-countdown';
import { ResultsComponent } from './student/results/results.component';
import { UserComponent } from './Admin/user/user.component';


 
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ForgotpasswordComponent,
    DashbordComponent,
    AdminheaderComponent,
    AdminComponent,
    CourseComponent,
    FooterComponent,
    SubjectComponent,
    QuestionComponent,
    HeaderComponent,
    StudentComponent,
    StudentdashbordComponent,
    ExamComponent,
    PapersecondComponent,
    ResultComponent,
    LogoutComponent,
    ResultsComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
