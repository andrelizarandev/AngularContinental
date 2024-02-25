// Modules
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { QueryClient, provideAngularQuery } from '@tanstack/angular-query-experimental';

// Data
import { routes } from './app.routes';

// Reducers
import { reducers } from './state/reducers';
import { authInterceptor } from './api/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore(reducers, { metaReducers: [] }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAngularQuery(new QueryClient()),
  ]
};
