import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackerDetailComponent } from './slacker-detail.component';

describe('SlackerDetailComponent', () => {
  let component: SlackerDetailComponent;
  let fixture: ComponentFixture<SlackerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlackerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
