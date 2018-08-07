import { Component, OnInit } from '@angular/core';
import { Investigacion } from '../../../models/investigacion';
import { InvestigacionesService } from '../../../services/investigaciones.service';
import { InvestigacionDetalles } from '../../../models/detallados/investigacion-detalles';

@Component({
  selector: 'app-lista-investigaciones',
  templateUrl: './lista-investigaciones.component.html',
  styleUrls: ['./lista-investigaciones.component.css'],
  providers:[InvestigacionesService]
})
export class ListaInvestigacionesComponent implements OnInit {


  public titulo:string;
  public result:any; //recive la peticion http del servicio

  public investigaciones:Array<Investigacion>;
  public investigaciones_detalles:Array<InvestigacionDetalles>;
  public investigacionSeleccionada: Investigacion; 
  public verInvestigacion:InvestigacionDetalles;
  

  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>; //array que guardara el numero de paginas


  constructor(
      private _investigaciones_service:InvestigacionesService
  ){
      this.titulo='Investigaciones Realizadas';
      this.verInvestigacion = new InvestigacionDetalles(0,'','',0,'','','','','','',0,'','','','','','','','','','','','','','','',0,'',0,'','','');
      this.arrayPag=[];
      this.pag = 1;
      this.investigaciones=[];
      this.investigaciones_detalles = [];
  }
  ngOnInit(){
      this.obtenerInvestigacionsDetalles();
      this.obtenerInvestigaciones();
  }

  public obtenerInvestigacionsDetalles(){
      this._investigaciones_service.getInvestigacionesDetalles().subscribe(
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

    public obtenerInvestigaciones(){
    this._investigaciones_service.getInvestigaciones().subscribe(
        result=>{
            if(result['result']){
                this.investigaciones=result['result'];
                console.log(this.investigaciones);
            }else{
                console.log(result);
            }
        });
  }

  public seleccionarInvestigacion(investigacion:InvestigacionDetalles){
      this.verInvestigacion = investigacion;
      for(let i=0; i<this.investigaciones.length; i++){
          if(this.investigaciones[i].idinvestigacion == this.verInvestigacion.investigacion_idinvestigacion ){
              this.investigacionSeleccionada = this.investigaciones[i];
          }
      }
  }




  // ---------------------------------PAGINATION
  // CALCULAR PAGINACION
  public calcularPaginacion(){
      this.numRow = this.result.result.length;
      console.log(`-----------rows:${this.numRow}`);
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
      this.investigaciones_detalles=[];
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
          this.investigaciones_detalles[i]=this.result.result[index];
          index++;
      }
      console.log(this.investigaciones_detalles);
  }

  

}
