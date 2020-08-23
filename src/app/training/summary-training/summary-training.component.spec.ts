import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTrainingComponent } from './summary-training.component';

describe('SummaryTrainingComponent', () => {
  let component: SummaryTrainingComponent;
  let fixture: ComponentFixture<SummaryTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
