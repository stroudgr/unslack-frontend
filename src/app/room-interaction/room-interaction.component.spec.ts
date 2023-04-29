import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInteractionComponent } from './room-interaction.component';

describe('RoomInteractionComponent', () => {
  let component: RoomInteractionComponent;
  let fixture: ComponentFixture<RoomInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
