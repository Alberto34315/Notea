import { TestBed } from '@angular/core/testing';

import { TTSService } from './tts.service';

describe('TTSService', () => {
  let service: TTSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TTSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
