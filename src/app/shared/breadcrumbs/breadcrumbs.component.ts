import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import {filter,map} from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [
    Router
  ],
  templateUrl: './breadcrumbs.component.html',
  styles: `
  `,
 
})
export class BreadcrumbsComponent implements OnDestroy { 

  public titulo: string= '';
  public tituloSubs$:Subscription= new Subscription();

  constructor(private router: Router) { 
    this.tituloSubs$= this.getArgumentosRuta().subscribe(({titulo})=>{
      this.titulo=titulo;
      document.title= `LF | ${titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
    

    getArgumentosRuta(){
      return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );     
     
    }


}
