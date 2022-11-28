import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-editquestion',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Update questions</h5>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >question</label
                >
                <div class="col-sm-10">
                  <textarea
                    type="text"
                    class="form-control"
                    [(ngModel)]="questionObj.question"
                  ></textarea>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >A</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="questionObj.a"
                    id="inputText"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >B</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="questionObj.b"
                    id="inputText"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >C</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="questionObj.c"
                    id="inputText"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >D</label
                >
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="questionObj.d"
                    id="inputText"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >Answer</label
                >
                <div class="col-sm-10">
                  <div class="row">
                    <div class="col-3">
                      A. &nbsp;
                      <input
                        class="form-check-input"
                        type="radio"
                        name="correctAnswer"
                        [(ngModel)]="questionObj.correctAnswer"
                        value="a"
                      />
                    </div>
                    <div class="col-3">
                      B. &nbsp;
                      <input
                        class="form-check-input"
                        type="radio" name="correctAnswer"
                        [(ngModel)]="questionObj.correctAnswer"
                        value="b"
                      />
                    </div>
                    <div class="col-3">
                      c. &nbsp;
                      <input
                        class="form-check-input"
                        type="radio" name="correctAnswer"
                        [(ngModel)]="questionObj.correctAnswer"
                        value="c"
                      />
                    </div>
                    <div class="col-3">
                      D.&nbsp;
                      <input
                        class="form-check-input"
                        type="radio" name="correctAnswer"
                        [(ngModel)]="questionObj.correctAnswer"
                        value="d"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >level</label
                >
                <div class="col-sm-10">
                  <div class="row">
                    <div class="col-4">
                      hard. &nbsp;
                      <input
                        class="form-check-input"
                        type="radio" name="level"
                        [(ngModel)]="questionObj.level"
                        value="hard"
                      />
                    </div>
                    <div class="col-4">
                      mideum. &nbsp;
                      <input
                        class="form-check-input"
                        type="radio"name="level"
                        [(ngModel)]="questionObj.level"
                        value="mideum"
                      />
                    </div>
                    <div class="col-4">
                      easy. &nbsp;
                      <input
                        class="form-check-input"
                        type="radio"name="level"
                        [(ngModel)]="questionObj.level"
                        value="easy"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  (click)="onupdate()"
                >
                  added
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class EditquestionComponent implements OnInit {

  questionObj:any


  onupdate() {
    if (
      this.questionObj.question.length == 0 ||
      this.questionObj.a.length == 0 ||
      this.questionObj.b.length == 0 ||
      this.questionObj.c.length == 0 ||
      this.questionObj.d.length == 0 ||
      this.questionObj.correctAnswer.length == 0 ||
      this.questionObj.level.length == 0
    ) {
      this.tostr.warning('blank field not accepted..');
    } else {
      this.aservice.updatequestions(this.questionObj).subscribe(
        (res) => {
          this.tostr.success('question updated..');
          this.rout.navigateByUrl('/admin/list-question')
        },
        (err) => {
          this.tostr.error('something went wrong');
        }
      );
    }
  }
  subjects: any = [];
  constructor(
    private aservice: AdminService,
    private tostr: ToastrService,
    private aRoute: ActivatedRoute,
    private rout: Router
  ) {}

  ngOnInit(): void {
    this.aservice
      .getquestion(this.aRoute.snapshot.params['questionId'])
      .subscribe(
        (res) => {
          this.questionObj=res.data
        },
        (err) => {
          if (err.error.data == "question not found"){
            this.tostr.error('question Not found');
          }else{
            this.tostr.error('Technical error occurred');
          }
        }
      );
  }
}
