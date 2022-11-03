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
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { UserExamsComponent } from './Admin/user-exams/user-exams.component';
import { ListQuestionComponent } from './Admin/list-question/list-question.component';
import { AgGridModule } from 'ag-grid-angular';
import { AddCourseComponent } from './Admin/add-course/add-course.component';
import { AddExamComponent } from './Admin/add-exam/add-exam.component';
import { AddSubjectComponent } from './Admin/add-subject/add-subject.component';
import { StudentexamComponent } from './student/studentexam/studentexam.component';
import { ButtoncomponentComponent } from './buttoncomponent/buttoncomponent.component';
import { DeleteuserbuttonComponent } from './buttoncomponent/deleteuserbutton.component';
import { UserstatusbuttonComponent } from './buttoncomponent/userstatusbutton.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { TooltipModule } from '@cesarbr/angular-tooltip';
import { CourseactionComponent } from './Admin/course/courseaction.component';
import { EditComponent } from './Admin/course/edit.component';
import { SubjectactionComponent } from './Admin/subject/subjectaction.component';
import { ExamactionComponent } from './Admin/exam/examaction.component';
import { EditquestionComponent } from './Admin/question/editquestion.component';
import { QuestionactionComponent } from './Admin/question/questionaction.component';
import { EditsubjectComponent } from './Admin/subject/editsubject.component';
import { DeletefileComponent } from './Admin/subject/deletefile.component';
import { PdfviewadminComponent } from './Admin/subject/pdfviewadmin.component';
import { PdfviewactionComponent } from './Admin/subject/pdfviewaction.component';
import { StudentFilesComponent } from './student/student-files/student-files.component';
import { StudentexamactionComponent } from './student/studentexam/studentexamaction.component';
import { ResultsactionComponent } from './student/results/resultsaction.component';
import { ExamresultpdfComponent } from './Admin/exam/examresultpdf.component';
import { ExamwaitingComponent } from './Admin/exam/examwaiting/examwaiting.component';
import { DatePipe } from '@angular/common';




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
    UserExamsComponent,
    ListQuestionComponent,
    AddCourseComponent,
    AddExamComponent,
    AddSubjectComponent,
    StudentexamComponent,
    ButtoncomponentComponent,
    DeleteuserbuttonComponent,
    UserstatusbuttonComponent,
    AddUserComponent,
    CourseactionComponent,
    EditComponent,
    SubjectactionComponent,
    ExamactionComponent,
    EditquestionComponent,
    QuestionactionComponent,
    EditsubjectComponent,
    DeletefileComponent,
    PdfviewadminComponent,
    PdfviewactionComponent,
    StudentFilesComponent,
    StudentexamactionComponent,
    ResultsactionComponent,
    ExamresultpdfComponent,
    ExamwaitingComponent,
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
    CountdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule,
    TooltipModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
