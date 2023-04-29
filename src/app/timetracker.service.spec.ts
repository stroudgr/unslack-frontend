import { TestBed, inject } from '@angular/core/testing';

import { TimetrackerService } from './timetracker.service';

describe('TimetrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimetrackerService]
    });
  });

  it('should be created', inject([TimetrackerService], (service: TimetrackerService) => {
    expect(service).toBeTruthy();
  }));
});
