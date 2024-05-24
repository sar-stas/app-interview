import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/api/login') && req.method === 'POST') {
      const { username, password } = req.body;

      // Проверка логина и пароля
      if (username === 'admin' && password === 'admin') {
        return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 200, body: { success: false } })).pipe(delay(500));
      }
    }

    return next.handle(req);
  }
}
