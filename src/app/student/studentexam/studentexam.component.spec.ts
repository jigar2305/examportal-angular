import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentexamComponent } from './studentexam.component';

describe('StudentexamComponent', () => {
  let component: StudentexamComponent;
  let fixture: ComponentFixture<StudentexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentexamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
