import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilityNoticeComponent } from './liability-notice.component';

describe('LiabilityNoticeComponent', () => {
  let component: LiabilityNoticeComponent;
  let fixture: ComponentFixture<LiabilityNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiabilityNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiabilityNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
