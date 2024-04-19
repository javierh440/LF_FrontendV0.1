import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { SidebarService } from '@services/sidebar.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styles:  ` `,
})
export class SidebarComponent {

  public menuItems = routes
    .map(route => route.children ?? [])
    .flat()
    .filter(route => route && route.path)
    .filter(route => !route.path?.includes(':') );


  
  constructor() {
    
  }

  

}
