import { Component } from '@angular/core';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styles:  ` `,
})
export class SidebarComponent {

  public menuItems = routes
    .map(route => route.children ??[])
    .flat()
    .filter(route => route && route.path)
    .filter(route => !route.path?.includes(':') )

  constructor() {
    
  }


}
