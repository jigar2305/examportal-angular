import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamActionComponent } from './user-exam-action.component';

describe('UserExamActionComponent', () => {
  let component: UserExamActionComponent;
  let fixture: ComponentFixture<UserExamActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExamActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExamActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
