import { Routes } from '@angular/router';
import { DashboardLayout } from './dashboard/layout/dashboard-layout/dashboard-layout';
import { adminGuard } from '@core/guards/admin-guard';

export const PRIVATE_ROUTES: Routes = [
    {
        path: '',
        component: DashboardLayout,
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./dashboard/dashboard-page/page/dashboard-page')
                        .then((m) => m.DashboardPage),
            },
            {
                path: 'business',
                canActivate: [adminGuard],
                loadComponent: () =>
                    import('./dashboard/business/pages/business')
                        .then((m) => m.Business),
            },
            {
                path: 'team',
                loadComponent: () =>
                    import('./dashboard/team/pages/team')
                        .then((m) => m.Team),
            },
        ],
    },
];