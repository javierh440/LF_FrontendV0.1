import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contribuyente } from '@models/contribuyente';


import { PaginatorComponent } from '../paginator/paginator.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GenericService } from '@services/generic.service';





@Component({
  selector: 'app-contribuyente',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PaginatorComponent,
    MatPaginatorModule,
    MatTableModule,


  ],
  templateUrl: './contribuyente.component.html',
  styleUrl: './contribuyente.component.css',

})
export default class ContribuyenteComponent {
  
  endpoint: string = 'contribuyente';

  totalRegistros: number = 0;
  paginaActual: number = 0;
  totalPorPagina: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  cargando: boolean = false;
  contribuyentes!: Contribuyente[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'nombres',
    'razonSocial', 'correo', 'telefono', 'direccion', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private genericService: GenericService<Contribuyente>,) {
    
  }

  ngOnInit(): void {
    this.calcularRango();
  }

  Filterchange(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  handlePageEvent(event: PageEvent) {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRango();
    // Aquí puedes realizar acciones adicionales, como cargar los datos de la nueva página
  }

  /*paginar(event:PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;    
    this.calcularRango();
  }*/

  calcularRango() {

    this.genericService.getAllPage(this.endpoint,this.paginaActual.toString(), this.totalPorPagina.toString())
      .subscribe({
        next: (response: any) => {
          this.contribuyentes = response.content as Contribuyente[];
          this.dataSource = new MatTableDataSource<Contribuyente>(this.contribuyentes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.totalRegistros = response.totalElements as number;
          this.paginaActual = response.number as number;
          this.totalPorPagina = response.size as number;
        },
        error: (err) => {
        
        }
      });
  };


  editcustomer(contribuyente: Contribuyente): void {
    console.log(contribuyente);
  }
  detailcustomer(contribuyente: Contribuyente): void {
    console.log(contribuyente);
  }


  buscarContribuyente(event: any) {
    console.log('Buscando contribuyente...');
  }

}

