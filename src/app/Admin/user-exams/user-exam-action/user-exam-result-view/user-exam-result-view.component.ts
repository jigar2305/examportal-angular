import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/share.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-user-exam-result-view',
  template: `
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <div class="card-header">
            <h1 class="">{{ result.exam.examName }}</h1>
            <div class="row">
              <h2 class="col-6">
                <strong>Total:&nbsp;</strong>{{ result.totalMarks }}
              </h2>
              <h2 class="col-6">
                <strong>Obtain:&nbsp;</strong>{{ result.obtainMarks }}
              </h2>
              <h1
                class="col-6"
                *ngIf="(result.totalMarks * 33) / 100 < result.obtainMarks"
              >
                pass
              </h1>
              <h1
                class="col-6"
                *ngIf="(result.totalMarks * 33) / 100 > result.obtainMarks"
                style="color: red;"
              >
                fail
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
                <td>{{ q.question.question }}</td>
                <td>{{ q.question.a }}</td>
                <td>{{ q.question.b }}</td>
                <td>{{ q.question.c }}</td>
                <td>{{ q.question.d }}</td>
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
    console.log(examId, userId, resultId);

    this.sservice.getresultquestion(userId, examId).subscribe(
      (res) => {
        this.que = res.data;
      },
      (err) => { }
    );
    this.sservice.getresult(resultId).subscribe(
      (res) => {
        this.result = res.data;
      },
      (err) => { }
    );
  }
}
