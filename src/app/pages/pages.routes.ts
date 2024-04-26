import { Routes } from '@angular/router';



export const pagesRoutes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./pages.component'),
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard',
                data: {titulo: 'Dashboard'},
                loadComponent: () => import('./dashboard/dashboard.component')
            },
            {
                path: 'contribuyente',
                title: 'Contribuyente',
                data:{
                    titulo: 'Contribuyente'},
                loadComponent: () => import('./contribuyente/contribuyente.component')
            },

            {
                path:'giro-negocio',
                title: 'Giro de Negocio',
                data:{
                    titulo: 'Giro de Negocio'},
                loadComponent: () => import('./giro-negocio/giro-negocio/giro-negocio.component')
            },           
            
            {
                path:'contribuyente/:id',
                loadComponent: () => import('./contribuyente/contribuyente-form/contribuyente-form.component'),
                data:{titulo:'Formulario de Contribuyente'}
            },

            {
                path: '', redirectTo: 'dashboard', pathMatch: 'full'
            },
            
        ]

    },
    
    // Add more child routes here
];

export default pagesRoutes;