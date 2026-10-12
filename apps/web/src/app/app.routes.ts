import { Routes } from '@angular/router';
import { DashboardLayout } from './features/private/dashboard/dashboard-layout/dashboard-layout';
import { Login } from './features/public/login/login';

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
        component: DashboardLayout,
        /*
                children: [
        
                    {
                        path: 'dashboard',
                        component: Dashboard,
                    },
        
                    {
                        path: 'business',
                        component: Business,
                    },
        
                    {
                        path: 'team',
                        component: Team,
                    },
        
                ],
        */
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
