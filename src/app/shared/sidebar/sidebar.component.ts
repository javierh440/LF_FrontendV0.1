import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import pagesRoutes from '../../pages/pages.routes';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styles:  ` `,
})
export class SidebarComponent {

  public menuItems = pagesRoutes
    .map(route => route.children ?? [])
    .flat()
    .filter(route => route && route.path)
    .filter(route => !route.path?.includes(':') );


  
  constructor() {
    
  }

  

}
