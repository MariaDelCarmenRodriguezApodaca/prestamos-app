import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../../../models/encuesta';
import { EncustasService } from '../../../services/encuestas.service';
import { EncuestaDetallesSimple } from '../../../models/detallados/encuesta-detalles-simple';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { ToastrModule } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-encuestas-pendientes',
  templateUrl: './encuestas-pendientes.component.html',
  styleUrls: ['./encuestas-pendientes.component.css'],
  providers:[EncustasService]
})
export class EncuestasPendientesComponent implements OnInit {
  public titulo:string
  public result:any;

  public encuestas_detalles_simples:Array<EncuestaDetallesSimple>;
  public encuestas_pendientes:Array<Encuesta>;
  public encuestaSeleccionada:Encuesta;

  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>; //array que guardara el numero de paginas


  constructor(
      private _encuestasService:EncustasService,
      private toastr:ToastrModule
  ){
      this.titulo="Se arranco encuestascomponente()";
      this.pag = 1; //se inicializa en la pagina 1
      this.arrayPag=[];
      this.encuestas_detalles_simples=[];
      this.encuestas_pendientes=[];
      this.encuestaSeleccionada=new Encuesta(0,0,'',0,'','','','','','','',0,'','','',0,'','','','','','','','','','','','','','','');
  }
  ngOnInit(){
      this.ObtenerEncuestas();
  }

  public ObtenerEncuestas(){
     // Se obtiene la encuesta como tal
     this._encuestasService.gteEncuestasPendientes().subscribe(
      result=>{
          if(result['result']){
              this.encuestas_pendientes=result['result'];
              console.log('encuestasPendientes: ',this.encuestas_pendientes);
          }else{
              console.log(result);
          }
      });
      var status='Pendiente';
      // Se obtienen los detalles de las encuestas
      this._encuestasService.getEncuestaDetallesSimples(status).subscribe(
          result=>{
              if(result['result']){
                  this.result=result; 
                  this.calcularPaginacion();
              }else{
                  console.log(result);
              }
          });
  }

  

  public verDatos(idencuesta:number){
    for(let index=0 ; index<this.encuestas_pendientes.length ; index++){
        if(idencuesta == this.encuestas_pendientes[index].idencuesta){
            this.encuestaSeleccionada = this.encuestas_pendientes[index];
        }
    }
    console.log(this.encuestaSeleccionada);
  }

  public updateEncuesta(){
    console.log(this.encuestaSeleccionada);
    this._encuestasService.updateEncuesta(this.encuestaSeleccionada).subscribe(
        result=>{
            if(result['result']){
                console.log('Encuesta guardada con exito');
                alert('guardada');
            }
            else{
                alert('error al guardar');
            }
        }
    );
  }

  public limpiarForm(form:NgForm){
    form.reset();
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
      this.encuestas_detalles_simples=[];
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
          this.encuestas_detalles_simples[i]=this.result.result[index];
          index++;
      }
      console.log(this.encuestas_detalles_simples);
  }


}