import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Licencias',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/' },
        { title: 'Contribuyente', url: '/contrubuyente' },
        { title: 'Giro-Negocio', url: '/gironegocio' },
        { title: 'Solicitud', url: '/solicitud' }      
        
      ]
    }
  ];

  constructor() { }

}
