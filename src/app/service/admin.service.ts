import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  enrollexam(enroll: any) {
    return this.http.post(environment.url + 'er/add', enroll);
  }

  constructor(private http: HttpClient) {}

  Listcourse(): Observable<any> {
    return this.http.get(environment.url + 'course/list');
  }
  deletecourse(courseId: any): Observable<any> {
    return this.http.delete(environment.url + 'course/delete/' + courseId);
  }
  addcourse(course: any): Observable<any> {
    return this.http.post(environment.url + 'course/add', course);
  }
  // -----------------------------------------------------------------------------------------

  Listsubject(): Observable<any> {
    return this.http.get(environment.url + 'subject/list');
  }
  deletesubject(subjectId: any): Observable<any> {
    return this.http.delete(environment.url + 'subject/delete/' + subjectId);
  }
  addsubject(subject: any, files: any): Observable<any> {
    let subjects = { subject, files };
    var formdata = new FormData();
    formdata.append('subject', subject);
    formdata.append('files', files);
    let header = new HttpHeaders();
    // header = header.append('content-type', 'multipart/form-data');
    return this.http.post(environment.url + 'subject/add2', subjects, {
      headers: header,
    });
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
  deleteuser(userId: number): Observable<any> {
    return this.http.delete(environment.url + 'admin/deleteuser/' + userId);
  }
  userstatus(userId: number): Observable<any> {
    return this.http.get(environment.url + 'admin/updatestatus/' + userId);
  }
}
