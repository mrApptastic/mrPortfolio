import { TestBed } from '@angular/core/testing';

import { CvDataService } from './cv.data.service';

describe('Cv.DataService', () => {
  let service: CvDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
