// Modules
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';

// Data
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
