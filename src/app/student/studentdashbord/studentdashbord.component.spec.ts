import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdashbordComponent } from './studentdashbord.component';

describe('StudentdashbordComponent', () => {
  let component: StudentdashbordComponent;
  let fixture: ComponentFixture<StudentdashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentdashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentdashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
