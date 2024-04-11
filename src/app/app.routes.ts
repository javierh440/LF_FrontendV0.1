import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./pages/pages.component'),
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component')
            },
            {
                path: 'contribuyente',
                title: 'Contribuyente',
                loadComponent: () => import('./pages/contribuyente/contribuyente.component')
            },
            {
                path: '', redirectTo: 'dashboard', pathMatch: 'full'
            },
            
        ]

    },
    
    {path: 'login' , loadComponent: () => import('./auth/login/login.component')},
    {
        path: '**',
        loadComponent: () => import('./pages/nopagefound/nopagefound.component')
    
    },
    
    {path: '', redirectTo: '/pages', pathMatch: 'full'},
    
];
