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


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ForgotpasswordComponent,
    DashbordComponent,
    AdminheaderComponent,
    AdminComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
