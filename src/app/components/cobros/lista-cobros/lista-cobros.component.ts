import { Component, OnInit } from '@angular/core';
import {Cobro} from '../../../models/cobro';
import {CobrosService} from '../../../services/cobros.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-lista-cobros',
  templateUrl: './lista-cobros.component.html',
  styleUrls: ['./lista-cobros.component.css'],
  providers:[CobrosService]
})
export class ListaCobrosComponent implements OnInit {
  public titulo:string;
  public result:any;

  public cobros:Array<Cobro>;
  public infoCobro:Cobro;

  
  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>; //array que guardara el numero de paginas

  constructor(
      private _cobrosService:CobrosService
  ){
      this.titulo='Reporte de Cobros'
      this.infoCobro = new Cobro(0,0,0,0,'',0,'','','');
      this.arrayPag=[];
      this.pag=1;
  }

  ngOnInit(){
     this.ObtenerCobros();
  }

  public ObtenerCobros(){
      this._cobrosService.getCobros().subscribe(
          result=>{
              if(result['result']){
                  this.result=result;
                  console.log(this.result.result);
                  this.calcularPaginacion();
              }else{
                  console.log(result);
              }
          });
  }

  public mostrarCobro(cobro:Cobro){
      this.infoCobro = cobro;
  }

  public guardarCambios(){
      console.log(this.infoCobro);
      this._cobrosService.updateCobro(this.infoCobro).subscribe(
          result=>{
              if(result['result']){
                  this.result=result['result'];
                  this.cobros=result['result'] as Cobro[];
                  this.ObtenerCobros();
                  console.log(this.cobros);
              }else{
                  console.log(result);
              }
          }
      );
  }

  public limpiarForm(form:NgForm){
      form.reset();
      this.infoCobro= new Cobro(0,0,0,0,'',0,'','','');
      this.ObtenerCobros;
  }


  
  // ---------------------------------PAGINATION
  // CALCULAR PAGINACION
  public calcularPaginacion(){
      this.numRow = this.result.result.length;
      console.log(`-----------rows:${this.numRow}`)
      this.numPag = this.numRow/10;
      if(!Number.isInteger(this.numPag)){
          this.numPag=Math.trunc(this.numPag);
          this.numPag += 1;
      }
      console.log(`El numero de paginas sera: ${this.numPag}`);
      for(let i=0; i < this.numPag; i++){
          this.arrayPag[i]=i+1;
      }
      console.log(`El arreglo con las paginas es: `,this.arrayPag);
      this.cambiarPagina(this.pag);
  }
  // CONTROLAR PAGINACION
  public cambiarPagina(pag){
      this.cobros=[];
      this.pag = pag;
      var calculo1 = this.pag * 10;
      console.log(`El calculo1 es ${calculo1}`)
      var resta = 0;
      if(calculo1 > this.numRow){
          //si es mayor veo por cuanto
          var resta = calculo1 - this.numRow;
          console.log(`pag*10 se exede del numero de rows por: ${resta}`);
          // le resto eso en el for
      }
      var x = calculo1-resta;
      var index = this.pag-1;
      var limite = ((this.numRow < 10) ?this.numRow :10);
      for(let i=0; i < limite ; i++ ){ //ciclo para iterar peticion
          this.cobros[i]=this.result.result[index];
          index++;
      }
      console.log(this.cobros);
  }

}