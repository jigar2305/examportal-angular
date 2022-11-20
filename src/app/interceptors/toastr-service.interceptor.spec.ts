import { TestBed } from '@angular/core/testing';

import { ToastrServiceInterceptor } from './toastr-service.interceptor';

describe('ToastrServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ToastrServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ToastrServiceInterceptor = TestBed.inject(ToastrServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
