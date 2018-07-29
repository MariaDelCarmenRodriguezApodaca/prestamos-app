import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../../../services/clientes.service';
import {Cliente} from '../../../models/cliente';
import {GLOBAL} from '../../../services/global'; 
@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css'],
  providers:[ClientesService]
})
export class ListaClientesComponent implements OnInit {
  public url;
  public result:any;//aqui se guarda el resultado de una peticion http;
  public titulo:string;
  
  public clientes:Array<Cliente>;
  public info_cliente:Cliente;


  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>=[]; //array que guardara el numero de paginas

  public imagenIne:any;

  constructor(
      private _clienteService:ClientesService
  ){
      this.titulo='Se arranco el componente ClientesComponent';
      this.url = GLOBAL.url;
      //----------------------inicializar
      this.pag=1;
      this.arrayPag=[];
      this.clientes = [];
      this.info_cliente = new Cliente(1,'cargando','cargando','cargando','cargando','','','','','',0,'1.jpg','1.jpg',0,0);

      this.imagenIne = "";
  }
  ngOnInit(){
      console.log(this.titulo);
      this.getClientes();
  }

  public getClientes(){
      this._clienteService.getClientes().subscribe(
          result =>{
             if(!result['result']){
                  console.log(result);
              }else{
                  this.result=result;
                  console.log(this.result.result);
                  this.calcularPaginacion();
              }
          }
      )
  }

  public infoCliente(id){
      for (let index = 0; index < this.clientes.length; index++) {
          if(this.clientes[index].idcliente==id){
              this.info_cliente=this.clientes[index];
          }
      }
      console.log(this.info_cliente);
  }

  public subirImg(files: FileList){
      console.log(files);
      console.log(this.imagenIne);
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
      this.clientes=[];
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
          this.clientes[i]=this.result.result[index];
          index++;
      }
      console.log(this.clientes);
  }
}