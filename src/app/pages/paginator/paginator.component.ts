import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  standalone: true,
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})

export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  paginador: any;
  @Input()
  ingreso: string="";

  paginas: number[]=[];
  desde: number=0;
  hasta: number=0;

  constructor() { }

  ngOnInit(): void {
    //inicializar el paginator
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginador'];
    if(paginadorActualizado.previousValue){
      this.initPaginator();
    }
  }


  private initPaginator(): void {
    //  console.log(this.paginador);
    this.desde = Math.min(Math.max(1, this.paginador.number - 10), this.paginador.totalPages - 11);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number +10), 12);
   
    
    if(this.paginador.totalPages> 11){
      this.paginas = new Array(this.hasta - this.desde +1).fill(0).map( (_valor, indice) => indice + this.desde);
      
    }else{
      this.paginas = new Array(this.paginador.totalPages).fill(0).map( (_valor, indice)=> indice+1);
    }
  }
}
