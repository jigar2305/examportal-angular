import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  getexamquestion(examId:any):Observable<any>{
    return this.http.get(environment.url+"eqc/get/"+examId)
  }
  getquestion(examId:any):Observable<any>{
    return this.http.get(environment.url+"eqc/getque/"+examId)
  }

  submitquestion(questionanswer:any):Observable<any>{
    return this.http.post(environment.url+"eqc/checkanswer",questionanswer)
  }

  getresults(userId:any):Observable<any>{
    return this.http.get(environment.url+"result/list/"+userId)
  }
  getresultquestion(userId:any,examId:any):Observable<any>{
    return this.http.get(environment.url+"result/listresult/"+userId+"/"+examId)
  }
  getresult(resultId:any):Observable<any>{
    return this.http.get(environment.url+"result/get/"+resultId)
  }


}
