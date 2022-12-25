import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/interfaces/entity';
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
              <!-- <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label"
                  >question</label
                >
                <div class="col-sm-10">
                <div class="NgxEditor__Wrapper">
                      <ngx-editor-menu [editor]="editor" [toolbar]="toolbar"> </ngx-editor-menu>
                      <ngx-editor
                        [editor]="editor"
                        [(ngModel)]="questionObj.question"
                        [disabled]="false"
                        [placeholder]="'Type here...'"
                      ></ngx-editor>
                    </div>
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
                  update
                </button>
              </div> -->
        <div class="card">
          <div class="list-group list-group-flush">
            <div class="list-group-item">
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-1 col-form-label">question</label>
                <div class="col-sm-11">
                  <div class="NgxEditor__Wrapper">
                    <ngx-editor-menu [editor]="editor" [toolbar]="toolbar"> </ngx-editor-menu>
                    <ngx-editor [editor]="editor" [(ngModel)]="questionObj.question" [disabled]="false" id="question"
                      [spellcheck]="true" [placeholder]="'Type here...'">
                    </ngx-editor>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">A</label>
                    <div class="col-sm-10">
                      <div class="NgxEditor__Wrapper">
                        <ngx-editor-menu [editor]="editor1" [toolbar]="toolbar"> </ngx-editor-menu>
                        <ngx-editor [editor]="editor1" [(ngModel)]="questionObj.a" [disabled]="false" id="a"
                          [placeholder]="'Type here...'">
                        </ngx-editor>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">B</label>
                    <div class="col-sm-10">
                      <div class="NgxEditor__Wrapper">
                        <ngx-editor-menu [editor]="editor2" [toolbar]="toolbar"> </ngx-editor-menu>
                        <ngx-editor [editor]="editor2" [(ngModel)]="questionObj.b" [disabled]="false" id="b"
                          [placeholder]="'Type here...'">
                        </ngx-editor>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">C</label>
                    <div class="col-sm-10">
                      <div class="NgxEditor__Wrapper">
                        <ngx-editor-menu [editor]="editor3" [toolbar]="toolbar"> </ngx-editor-menu>
                        <ngx-editor [editor]="editor3" [(ngModel)]="questionObj.c" [disabled]="false" id="c"
                          [placeholder]="'Type here...'">
                        </ngx-editor>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">D</label>
                    <div class="col-sm-10">
                      <div class="NgxEditor__Wrapper">
                        <ngx-editor-menu [editor]="editor4" [toolbar]="toolbar"> </ngx-editor-menu>
                        <ngx-editor [editor]="editor4" [(ngModel)]="questionObj.d" [disabled]="false" id="d"
                          [placeholder]="'Type here...'">
                        </ngx-editor>
                      </div>
                    </div>
                  </div>
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
                  update
                </button>
              </div>
            </div>
          </div>
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

  questionObj!:Question
  editor!: Editor;
  editor1!: Editor;
  editor2!: Editor;
  editor3!: Editor;
  editor4!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

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
          this.rout.navigateByUrl('/admin/list-question')
        }
      );
    }
  }


  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
    this.editor2.destroy();
    this.editor3.destroy();
    this.editor4.destroy();
  }

  subjects: any = [];
  constructor(
    private aservice: AdminService,
    private tostr: ToastrService,
    private aRoute: ActivatedRoute,
    private rout: Router
  ) {}


ngOnInit(): void {
  this.editor = new Editor();
  this.editor1 = new Editor();
  this.editor2 = new Editor();
  this.editor3 = new Editor();
  this.editor4 = new Editor();
  this.aservice
      .getquestion(this.aRoute.snapshot.params['questionId'])
      .subscribe(
        (res) => {
          this.questionObj=res.data
        }
      );
  }
}
