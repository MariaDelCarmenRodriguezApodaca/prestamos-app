import { Component, OnInit } from '@angular/core';
import { GiroNegocio } from '../../../models/giro-negocio';
import { GirosNegocioService } from '../../../services/giros-negocio.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-giros-negocio',
  templateUrl: './giros-negocio.component.html',
  styleUrls: ['./giros-negocio.component.css'],
  providers:[GirosNegocioService]
})
export class GirosNegocioComponent implements OnInit {

  public titulo:string;

  public girosNegocios:Array<GiroNegocio>; //array con los giros 
  public result:any //reaultado de la peticion

  public giroNegocio:GiroNegocio; // giro que se guardara 

  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>; //array que guardara el numero de paginas

  constructor(
      private _girosNegocios:GirosNegocioService
  ){
      this.titulo='Se arranco el componente NegocioGiroComponent';
      this.giroNegocio= new GiroNegocio(null,''); //variable para negocio nuevo
      this.pag = 1; //se inicializa en la pagina 1
      this.arrayPag=[];
      this.girosNegocios=[];
      
  }
  ngOnInit(){
      console.log(this.titulo);
      this.getGiros();
  }
  
  // TRAER LOS GIROS Y GIARDARLOS EN VARIABLE RESULT
  public getGiros(){
      this._girosNegocios.getGirosNegocios().subscribe(
      res=>{ 
          if(res){
              this.result = res as GiroNegocio[];            
              this.calcularPaginacion();
          }});
  }

  public guardarGiro(){
      this._girosNegocios.addGiro(this.giroNegocio).subscribe(
          res=>{
              if(res){
                  console.log(`Giro guardado con exito`);
                  this.getGiros();
              }
          });
  }
  //--------------------------------------------
  public updateGiro(giro:GiroNegocio){
      console.log('Te aMo mi vida');
      this.giroNegocio=giro;
      console.log(this.giroNegocio);
  }
  //_---------------------------------------------------
  public saveUpdate(){
      this._girosNegocios.updateGiro(this.giroNegocio).subscribe(
          res=>{
              if(res){
                  console.log(`Giro modificado con exito`);
                  this.getGiros();
                  this.giroNegocio=new GiroNegocio(0,'');
              }
          });
  }



  // CALCULAR PAGINACION
  public calcularPaginacion(){
      this.girosNegocios = this.girosNegocios.splice(0, this.girosNegocios.length);
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
      this.pag = pag;
      var calculo1 = this.pag*10;
      var resta = 0;
      console.log(`${calculo1} > ${this.numRow} ??`);
      if(calculo1 > this.numRow){
          //si es mayor veo por cuanto
          var resta = calculo1 - this.numRow;
          console.log(`pag*10 se exede del numero de rows por: ${resta}`);
          // le resto eso en el for
      }
      var x = calculo1-resta;
      var index = this.pag-1;
      var limite = ((this.numRow < 10) ?this.numRow :10);
      for(var y=0; y < limite ; y++ ){ //ciclo para iterar peticion
          this.girosNegocios[y]=this.result.result[index];
          index++;
      }
      console.log(this.girosNegocios);
  }
  
  public limpiarForm(form:NgForm){
      form.reset();
      this.giroNegocio=new GiroNegocio(0,'');
  }
}

