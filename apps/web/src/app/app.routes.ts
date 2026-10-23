import { Routes } from '@angular/router';
import { Login } from './features/public/login/login';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./features/private/private.routes')
                .then((m) => m.PRIVATE_ROUTES),
    },
    {
        path: 'unauthorized',
        loadComponent: () =>
            import('./features/public/unauthorized/unauthorized')
                .then((m) => m.Unauthorized),
    },
    {
        path: 'not-authorized',
        loadComponent: () =>
            import('./features/public/not-authorized/not-authorized')
                .then((m) => m.NotAuthorized),
    },
    {
        path: '**',
        loadComponent: () =>
            import('./features/public/page-not-found/page-not-found')
                .then((m) => m.PageNotFound),
    },
];
