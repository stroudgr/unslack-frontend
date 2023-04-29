import { TestBed, inject } from '@angular/core/testing';

import { SlackerService } from './slacker.service';

describe('SlackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlackerService]
    });
  });

  it('should be created', inject([SlackerService], (service: SlackerService) => {
    expect(service).toBeTruthy();
  }));
});
