import { TestBed, inject } from '@angular/core/testing';

import { SinkService } from './sink.service';

describe('SinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SinkService]
    });
  });

  it('should be created', inject([SinkService], (service: SinkService) => {
    expect(service).toBeTruthy();
  }));
});
