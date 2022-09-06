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
    return this.http.post(environment.url+"course/add/",course)
  }


}
