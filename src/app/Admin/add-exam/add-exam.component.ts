import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent implements OnInit {
  examform: FormGroup;
  constructor(
    private adminservice: AdminService,
    private tostr: ToastrService
  ) {
    this.examform = new FormGroup({
      time: new FormControl('', [Validators.required]),
      examName: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      isshow: new FormControl(''),
    });
  }
  ngOnInit(): void {}

  addexam() {
    if (this.examform.valid) {
      this.adminservice.addexam(this.examform.value).subscribe(
        (res) => {
          this.tostr.success('exam added..');
          this.examform.reset();
        },
        (err) => {
          this.tostr.error('something went wrong');
        }
      );
    } else {
      this.tostr.info('Please fill form correctly');
    }
  }
}
