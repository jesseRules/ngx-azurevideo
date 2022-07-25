import { TestBed } from '@angular/core/testing';

import { NgxAzurevideoService } from './ngx-azurevideo.service';

describe('NgxAzurevideoService', () => {
  let service: NgxAzurevideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAzurevideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
