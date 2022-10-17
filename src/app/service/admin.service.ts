import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  enrollexam(enroll: any) {
    return this.http.post(environment.url + 'er/add', enroll);
  }


  Listcourse(): Observable<any> {
    return this.http.get(environment.url + 'course/list');
  }

  deletecourse(courseId: any): Observable<any> {
    return this.http.delete(environment.url + 'course/delete/' + courseId);
  }
  addcourse(course: any): Observable<any> {
    return this.http.post(environment.url + 'course/add', course);
  }
  getcourse(courseId:number): Observable<any> {
    return this.http.get(environment.url + 'course/coursebyId/'+courseId);
  }
  // -----------------------------------------------------------------------------------------

  Listsubject(): Observable<any> {
    return this.http.get(environment.url + 'subject/list');
  }
  deletesubject(subjectId: any): Observable<any> {
    return this.http.delete(environment.url + 'subject/delete/' + subjectId);
  }
  addsubject(subjectform: any): Observable<any> {
    return this.http.post(environment.url + 'subject/add2', subjectform);
  }
  // -----------------------------------------------------------------------------------------------

  addquestions(question: any): Observable<any> {
    return this.http.post(environment.url + 'que/add', question);
  }
  updatequestions(question: any): Observable<any> {
    return this.http.put(environment.url + 'que/update', question);
  }
  addquestionsbyexcel(file: any): Observable<any> {
    const formdata = new FormData();
    formdata.append('file', file);
    return this.http.post(environment.url + 'file/excel', formdata);
  }
  listquestions(): Observable<any> {
    return this.http.get(environment.url + 'que/list');
  }
  deletquestion(questionId: number): Observable<any> {
    return this.http.delete(environment.url + 'que/delete/' + questionId);
  }
  // ---------------------------------------------------------------------------------------------

  addexam(exam: any): Observable<any> {
    return this.http.post(environment.url + 'exam/add', exam);
  }
  listexam(): Observable<any> {
    return this.http.get(environment.url + 'exam/list');
  }
  listexambyid(userId: number): Observable<any> {
    return this.http.get(environment.url + 'exam/list/' + userId);
  }
  deleteExam(examId: any): Observable<any> {
    return this.http.delete(environment.url + 'exam/delete/' + examId);
  }
  addexamquestions(examquestion: any): Observable<any> {
    return this.http.post(environment.url + 'eqc/add', examquestion);
  }
  addexamquestionsbymanysubjects(examquestion: any): Observable<any> {
    return this.http.post(environment.url + 'eqc/add/many', examquestion);
  }
  // ---------------------------------------------------------------
  listuser(): Observable<any> {
    return this.http.get(environment.url + 'admin/userlist');
  }
  finduser(userId:number): Observable<any> {
    return this.http.get(environment.url + 'admin/user/'+userId);
  }
  deleteuser(userId: number): Observable<any> {
    return this.http.delete(environment.url + 'admin/deleteuser/' + userId);
  }
  userstatus(userId: number): Observable<any> {
    return this.http.get(environment.url + 'admin/updatestatus/' + userId);
  }
}
