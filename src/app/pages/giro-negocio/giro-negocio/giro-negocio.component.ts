import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { GiroNegocio } from '@models/giro-negocio';
import { RubroNegocio } from '@models/rubro-negocio';
import { AlertService } from '@services/alert.service';
import { GenericService } from '@services/generic.service';
import { PaginatorComponent } from '../../paginator/paginator.component';


@Component({
  selector: 'app-giro-negocio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PaginatorComponent,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: './giro-negocio.component.html',
  styleUrl: './giro-negocio.component.css',


})
export default class GiroNegocioComponent {

  totalRegistros: number = 0;
  paginaActual: number = 0;
  totalPorPagina: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource: any;

  displayedColumns: string[] = ['id', 'nombre', 'rubroNegocio', 'action'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  endpointRubro: string = 'rubronegocio';
  endpointGiro: string = 'gironegocio';
  rubroNegocios!: RubroNegocio[];
  giroNegocios!: GiroNegocio[];
  giroNegocio!:GiroNegocio;
  formGiro!: FormGroup;

  constructor(private genericService: GenericService<RubroNegocio>, private genericService2: GenericService<GiroNegocio>
    ,private fb: FormBuilder, private alertService: AlertService ) {
    
      this.calcularRango();
  }

  ngOnInit(): void {
    this.genericService.getAll(this.endpointRubro).subscribe((data: RubroNegocio[]) => {
      this.rubroNegocios = data;      
    }
    );
    this.registroForm();
  }
  registroForm() {
    this.formGiro = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],     
      rubroNegocioId: ['', Validators.required],           
    });
  }

  handlePageEvent(event: PageEvent) {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRango();
  }

  guardarGiro(){
    if(this.formGiro.valid){
      this.giroNegocio = this.formGiro.value;
      console.log(this.giroNegocio);         
      this.genericService.create(this.endpointGiro, this.formGiro.value).subscribe((data: RubroNegocio) => {
        this.genericService.getAll(this.endpointGiro).subscribe((data: RubroNegocio[]) => {
          this.rubroNegocios = data;
          this.alertService.success('Giro de negocio creado con éxito', 'Giro de Negocio');
          this.formGiro.reset();
        });
      });
    }
  } 

  cargarGiro(id: number){
   
    this.genericService.getById(this.endpointGiro,id).subscribe((data: any) => {
      this.giroNegocio = data;
      this.formGiro.setValue({
        id: this.giroNegocio.id,
        nombre: this.giroNegocio.nombre,
        rubroNegocioId: this.giroNegocio.rubroNegocioId
      });
      
    });
  }  

  
  calcularRango() {

    this.genericService2.getAllPage(this.endpointGiro,this.paginaActual.toString(), this.totalPorPagina.toString())
      .subscribe({
        next: (response: any) => {
          this.giroNegocios = response.content as GiroNegocio[];
          console.log(this.giroNegocios);
          this.dataSource = new MatTableDataSource<GiroNegocio>(this.giroNegocios);
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

  Filterchange(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }


  // Metodo para limpiar el formulario
  resetForm = () => {
    this.formGiro.reset();
  }
 }
