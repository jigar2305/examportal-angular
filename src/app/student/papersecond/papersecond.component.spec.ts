import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapersecondComponent } from './papersecond.component';

describe('PapersecondComponent', () => {
  let component: PapersecondComponent;
  let fixture: ComponentFixture<PapersecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PapersecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapersecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
