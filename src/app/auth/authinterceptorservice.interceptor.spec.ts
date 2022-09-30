import { TestBed } from '@angular/core/testing';

import { AuthinterceptorserviceInterceptor } from './authinterceptorservice.interceptor';

describe('AuthinterceptorserviceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthinterceptorserviceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthinterceptorserviceInterceptor = TestBed.inject(AuthinterceptorserviceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
