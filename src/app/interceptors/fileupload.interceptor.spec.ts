import { TestBed } from '@angular/core/testing';

import { FileuploadInterceptor } from './fileupload.interceptor';

describe('FileuploadInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FileuploadInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FileuploadInterceptor = TestBed.inject(FileuploadInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
