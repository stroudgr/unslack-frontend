import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackerComponent } from './slacker.component';

describe('SlackerComponent', () => {
  let component: SlackerComponent;
  let fixture: ComponentFixture<SlackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
