import { Component, OnInit } from '@angular/core';

import {Ruta} from '../../../models/ruta'; //El modelo de sucursal
import {RutasService} from '../../../services/rutas.service'; //servicio de sucursales
import {NgForm} from '@angular/forms'; //Para poder hacer operaciones con el formulario desde el componente


@Component({
  selector: 'app-lista-rutas',
  templateUrl: './lista-rutas.component.html',
  styleUrls: ['./lista-rutas.component.css'],
  providers :[RutasService]
})

export class ListaRutasComponent implements OnInit {
  public titulo:string;
  public result:any; //recive la peticion http del servicio

  public rutas:Array<Ruta>;
  public editarRuta: Ruta; 
  

  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>; //array que guardara el numero de paginas


  constructor(
      private _rutasService:RutasService
  ){
      this.titulo='Se arranco el componente de sucursales';
      this.editarRuta = new Ruta(0,'','',0,'');
      this.arrayPag=[];
      this.pag = 1;
  }
  ngOnInit(){
      this.ObtenerSucursales();
  }

  public ObtenerSucursales(){
      this._rutasService.getRutas().subscribe(
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

  public mostrarRuta(ruta:Ruta){
      this.editarRuta = ruta;
  }

  public guardarCambios(){
      console.log(this.editarRuta);
      this._rutasService.updateRuta(this.editarRuta).subscribe(
          result=>{
              if(result['result']){
                  this.result=result['result'];
                  this.ObtenerSucursales();
                  console.log(this.rutas);
                  alert('Cambios guardados con éxito');
              }else{
                  console.log(result);
              }
          }
      );
  }
  
  public limpiarForm(form:NgForm){
      form.reset();
      this.editarRuta=new Ruta(0,'','',0,'');
      this.ObtenerSucursales;
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
      this.rutas=[];
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
          this.rutas[i]=this.result.result[index];
          index++;
      }
      console.log(this.rutas);
  }
  

}
