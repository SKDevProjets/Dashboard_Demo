import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@core/auth/auth-interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { errorInterceptor } from '@core/interceptors/error-interceptor-interceptor';
import { loadingInterceptor } from '@core/interceptors/loading-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        errorInterceptor,
      ])
    ),
  ]
};
