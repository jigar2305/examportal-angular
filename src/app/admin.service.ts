import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  Listcourse(): Observable<any>{
    return this.http.get(environment.url+"course/list")
  }
  deletecourse(courseId:any): Observable<any>{
    return this.http.delete(environment.url+"course/delete/"+courseId)
  }
  addcourse(course:any): Observable<any>{
    return this.http.post(environment.url+"course/add",course)
  }
  // -----------------------------------------------------------------------------------------
  
  Listsubject(): Observable<any>{
    return this.http.get(environment.url+"subject/list")
  }
  deletesubject(subjectId:any): Observable<any>{
    return this.http.delete(environment.url+"subject/delete/"+subjectId)
  }
  addsubject(subject:any): Observable<any>{
    return this.http.post(environment.url+"subject/add",subject)
  }
  // -----------------------------------------------------------------------------------------------
  
  addquestions(question:any): Observable<any>{
    return this.http.post(environment.url+"que/add",question)
  }
  listquestions(): Observable<any>{
    return this.http.get(environment.url+"que/list")
  }
  // ---------------------------------------------------------------------------------------------
  
  addexam(exam:any): Observable<any>{
    return this.http.post(environment.url+"exam/add",exam)
  }
  listexam(): Observable<any>{
    return this.http.get(environment.url+"exam/list")
  }
  deleteExam(examId:any):Observable<any>{
    return this.http.delete(environment.url+"exam/delete/"+examId)
  }
  addexamquestions(examquestion:any):Observable<any>{
    return this.http.post(environment.url+"eqc/add",examquestion)
  }

}
