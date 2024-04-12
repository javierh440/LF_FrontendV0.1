
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared/header/header.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { Component, OnInit } from '@angular/core';

declare function customInitFunction(): any;

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './pages.component.html',
  styles: ` `,

})
export default class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void{
    customInitFunction();
  }

 }
