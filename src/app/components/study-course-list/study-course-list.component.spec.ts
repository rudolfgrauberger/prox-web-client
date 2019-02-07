import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudyCourseListComponent} from './study-course-list.component';

describe('StudyCourseListComponent', () => {
  let component: StudyCourseListComponent;
  let fixture: ComponentFixture<StudyCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyCourseListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
