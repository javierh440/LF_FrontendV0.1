import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/pages.routes')
    },
    {   path: 'login', 
        loadComponent: () => import('./auth/login/login.component') },
    {
        path: '**',
        loadComponent: () => import('./pages/nopagefound/nopagefound.component')
    },


];
