import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/share.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-user-exam-result-view',
  template: `
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <div *ngIf="result">
            <h1>{{ result.exam.examName }}</h1>
            <div class="row">
              <h4 class="col-6">
                <strong>Total:&nbsp;</strong>{{ result.totalMarks }}
              </h4>
              <h3 class="col-6">
                <strong>Obtain:&nbsp;</strong>{{ result.obtainMarks }}
              </h3>
              <h1
                class="col-6"
                *ngIf="result.status == 'Pass'" style="color: green;">
                {{result.status}}
              </h1>
              <h1
                class="col-6"
                *ngIf="result.status != 'Pass'" style="color: red;">
                {{result.status}}
              </h1>
            </div>
          </div>
          <table
            class="table table-striped"
            style="text-align: center;"
            aria-describedby="result table"
          >
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">question</th>
                <th scope="col">A</th>
                <th scope="col">B</th>
                <th scope="col">C</th>
                <th scope="col">D</th>
                <th scope="col">correct answer</th>
                <th scope="col">Your answer</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let q of que; let i = index">
                <th scope="row">{{ i + 1 }}</th>
                <td [innerHtml]="q.question.question | htmlConvert"></td>
                <td [innerHtml]="q.question.a | htmlConvert"></td>
                <td [innerHtml]="q.question.b | htmlConvert"></td>
                <td [innerHtml]="q.question.c | htmlConvert"></td>
                <td [innerHtml]="q.question.d | htmlConvert"></td>
                <td>{{ q.question.correctAnswer }}</td>
                <td
                  *ngIf="q.question.correctAnswer == q.selectedOption"
                  style="background-color:  green;"
                >
                  {{ q.selectedOption }}
                </td>
                <td
                  *ngIf="q.question.correctAnswer != q.selectedOption"
                  style="background-color: red;"
                >
                  {{ q.selectedOption }}
                </td>
                <td
                  *ngIf="q.selectedOption == ''"
                  style="background-color: red;"
                >
                  not selected
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class UserExamResultViewComponent implements OnInit {
  userId: number = 0;
  results: Array<any> = [];
  result: any;
  que: any;

  constructor(private sservice: StudentService, private share: ShareService) { }

  ngOnInit(): void {
    this.setvalue();
  }
  setvalue() {
    let examId = this.share.getexamId() as number;
    let resultId = this.share.getresultId() as number;
    let userId = this.share.getuserId() as number;

    this.sservice.getresultquestion(userId, examId).subscribe(
      (res) => {
        this.que = res.data;
      }
    );
    this.sservice.getresult(resultId).subscribe(
      (res) => {
        this.result = res.data;
      }
    );
  }
}
