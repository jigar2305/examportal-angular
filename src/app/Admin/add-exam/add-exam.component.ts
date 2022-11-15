import { DatePipe, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent implements OnInit {
  subjects: Array<any> = [];
  subjectsshow: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsforsubject: IDropdownSettings = {};
  subjectIds: Array<any> = [];
  time!: number;
  examName: string = '';
  level: string = '';
  date!: String;
  startAt!: String;
  endAt!: String;
  Percentage!:number;
  isshow: boolean = false;
  courses: Array<any> = [];
  course: any;
  constructor(
    private adminservice: AdminService,
    private tostr: ToastrService,
    private router: Router,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.getallsubject();
    this.getallcourse();
    this.dropdownSettings = {
      idField: 'userId',
      textField: 'firstName',
    };
    this.dropdownSettingsforsubject = {
      idField: 'subjectId',
      textField: 'subjectName',
      allowSearchFilter: true,
    };
  }

  getallsubject() {
    this.adminservice.Listsubject().subscribe((res) => {
      this.subjects = res.data;
    });
  }
  getallcourse() {
    this.adminservice.Listcourse().subscribe((res) => {
      this.courses = res.data;
    });
  }
  courseselect() {
    this.subjectsshow = [];
    this.subjects.forEach((element) => {
      if (element.course.courseId == this.course.courseId) {
        this.subjectsshow.push(element);
      }
    });
  }
  select() {
    this.subjectIds.forEach((element: any) => {
      element['number'] = 0;
    });
  }
  addexamquestions() {
    let date1 = this.date;
    date1 = date1.replace('-', '/');
    date1 = date1.replace('-', '/');
    let flag = 0;
    this.subjectIds.forEach((element) => {
      if (element.number == 0 || element.number == null) {
        flag = 1;
      }
    });
    if (
      this.subjectIds.length == 0 ||
      this.examName.length == 0 ||
      this.examName == null ||
      this.level == null ||
      this.time == null ||
      this.time == 0 ||
      this.isshow == null ||
      this.startAt == null ||
      this.endAt == null ||
      this.date == null ||
      this.Percentage == null ||
      this.Percentage == 0 ||
      flag == 1
    ) {
      this.tostr.info('please fill form correctly');
    } else if (this.endAt < this.startAt) {
      this.tostr.info('end time is more than start time');
    } else {
      let addquestion = {
        examName: this.examName,
        level: this.level,
        time: this.time,
        isshow: this.isshow,
        subjects: this.subjectIds,
        date: date1,
        startAt: this.startAt,
        endAt: this.endAt,
        percentage: this.Percentage
      };
      this.adminservice.addexam(addquestion).subscribe(
        (res) => {
          this.router.navigateByUrl('/admin/exam');
          this.tostr.success(this.examName + ' added susseccfully..');
        },
        (err) => {
          if (err.error.msg == 'exam alredy added...') {
            this.tostr.error(this.examName + ' ' + 'is already exist');
          } else if (err.error.msg == 'please add questions first') {
            this.tostr.error('please add questions first');
          } else {
            this.tostr.error('please try again', 'Technical error occurred');
          }
        }
      );
    }
  }
}
