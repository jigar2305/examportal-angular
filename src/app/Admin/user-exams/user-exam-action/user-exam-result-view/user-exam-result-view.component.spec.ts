import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamResultViewComponent } from './user-exam-result-view.component';

describe('UserExamResultViewComponent', () => {
  let component: UserExamResultViewComponent;
  let fixture: ComponentFixture<UserExamResultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExamResultViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExamResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
