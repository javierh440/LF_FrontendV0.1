import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  standalone: true,
  selector: 'app-paginator',
  imports: [
    PaginatorComponent,
    MatPaginatorModule,
  ],
  templateUrl: './paginator.component.html'
})

export class PaginatorComponent {

  @Input() totalRegistros = 0;
  @Input() totalPorPagina = 10;
  @Input() paginaActual = 0;
  @Input() pageSizeOptions: number[] = [];

  @Output() pageEvent  = new EventEmitter<PageEvent>();
 

  constructor() { }

  handlePageEvent(event: PageEvent) {
    this.pageEvent.emit(event);
  }


}
