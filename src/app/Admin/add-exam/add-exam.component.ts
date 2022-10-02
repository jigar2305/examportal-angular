import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  time: number = 0;
  examName: string = '';
  level: string = '';
  isshow: boolean = false;
  courses: Array<any> = [];
  course: any;
  constructor(
    private adminservice: AdminService,
    private tostr: ToastrService
  ) {}
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
  courseselect(){
    this.subjectsshow = []
    this.subjects.forEach(element => {
      if(element.course.courseId == this.course.courseId){
        this.subjectsshow.push(element)
        console.log(element);
      }
    });
  }
  select() {
    this.subjectIds.forEach((element: any) => {
      element['number'] = 0;
    });
    console.log(this.subjectIds);
  }
  addexamquestions() {
    console.log(this.course);

    let addquestion = {
      examName: this.examName,
      level: this.level,
      time: this.time,
      subjects: this.subjectIds,
    };
    console.log(addquestion);
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
      flag == 1
    ) {
      this.tostr.info('please fill form correctly');
    } else {
      this.adminservice.addexam(addquestion).subscribe(
        (res) => {
          console.log(res);
          this.tostr.success(this.examName + ' added susseccfully..');
        },
        (err) => {
          if (err.error.msg == 'exam alredy added...') {
            this.tostr.error(this.examName + ' ' + 'is already exist');
          } else {
            this.tostr.error('something went wrong...');
          }
        }
      );
    }
  }
}
