import { Component, OnInit } from '@angular/core';
import {Empresa} from '../../../models/empresa';
import {EmpresasService} from '../../../services/empresas.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css'],
  providers:[EmpresasService]
})
export class ListaEmpresasComponent implements OnInit {
  public titulo:string;
  public result: any;

  public empresas:Array<Empresa>;
  public editarEmpresa:Empresa;


  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>; //array que guardara el numero de paginas


  constructor(
      private _empresasService:EmpresasService
  ){
      this.titulo='Empresas'
      this.editarEmpresa = new Empresa(0,'','','');
      this.arrayPag=[];
      this.pag=1;
  }

  ngOnInit(){
      this.ObtenerEmpresas();
  }

  public ObtenerEmpresas(){
      this._empresasService.getEmpresas().subscribe(
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

  public mostrarEmpresa(empresa:Empresa){
      this.editarEmpresa = empresa;
  }

  public guardarCambios(){
      console.log(this.editarEmpresa);
      this._empresasService.updateEmpresa(this.editarEmpresa).subscribe(
          result=>{
              if(result['result']){
                  this.result=result['result'];
                  this.empresas=result['result'] as Empresa[];
                  this.ObtenerEmpresas();
                  console.log(this.empresas);
              }else{
                  console.log(result);
              }
          }
      );
  }

  public limpiarForm(form:NgForm){
      form.reset();
      this.editarEmpresa= new Empresa(0,'','','');
      this.ObtenerEmpresas;
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
      this.empresas=[];
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
          this.empresas[i]=this.result.result[index];
          index++;
      }
      console.log(this.empresas);
  }





}