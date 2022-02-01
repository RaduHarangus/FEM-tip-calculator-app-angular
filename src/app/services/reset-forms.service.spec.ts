import { TestBed } from '@angular/core/testing';

import { ResetFormsService } from './reset-forms.service';

describe('ResetFormsService', () => {
  let service: ResetFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
