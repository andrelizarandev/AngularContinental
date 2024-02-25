// Modules
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';

// Texts
import { continentalToken } from '../data/data.texts';

export function authInterceptor (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {

  const token = localStorage.getItem(continentalToken);

  if (token) {

    const cloned = req.clone({ setHeaders: { authorization: `Bearer ${token}` }});

    return next(cloned);

  } else {

    return next(req);

  }
  
};