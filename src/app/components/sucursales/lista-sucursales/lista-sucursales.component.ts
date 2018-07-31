import { Component, OnInit } from '@angular/core';

import {Sucursal} from '../../../models/sucursal'; //El modelo de sucursal
import {SucursalesService} from '../../../services/sucursales.service'; //servicio de sucursales
import {NgForm} from '@angular/forms'; //Para poder hacer operaciones con el formulario desde el componente

//Para Select del form 
import { EmpleadosService } from '../../../services/empleados.service';
import { EmpresasService } from '../../../services/empresas.service';

@Component({
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',
  styleUrls: ['./lista-sucursales.component.css'],
  providers:[SucursalesService,EmpleadosService,EmpresasService]
})
export class ListaSucursalesComponent implements OnInit {
  public titulo:string;
  public result:any; //recive la peticion http del servicio

  public sucursales:Array<Sucursal>;
  public editarSucursal: Sucursal; 
  

  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>; //array que guardara el numero de paginas


  constructor(
      private _sucursalesService:SucursalesService
  ){
      this.titulo='Sucursales';
      this.editarSucursal = new Sucursal(0,'','','','','','','','','','');
      this.arrayPag=[];
      this.pag = 1;
  }
  ngOnInit(){
      this.ObtenerSucursales();
  }

  public ObtenerSucursales(){
      this._sucursalesService.getSucursales().subscribe(
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

  public mostrarSucursal(sucursal:Sucursal){
      this.editarSucursal = sucursal;
  }

  public guardarCambios(){
      console.log(this.editarSucursal);
      this._sucursalesService.updateSucursal(this.editarSucursal).subscribe(
          result=>{
              if(result['result']){
                  this.result=result['result'];
                  this.ObtenerSucursales();
                  console.log(this.sucursales);
              }else{
                  console.log(result);
              }
          }
      );
  }
  
  public limpiarForm(form:NgForm){
      form.reset();
      this.editarSucursal=new Sucursal(0,'','','','','','','','','','');
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
      this.sucursales=[];
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
          this.sucursales[i]=this.result.result[index];
          index++;
      }
      console.log(this.sucursales);
  }

    //Validar (xxx)yyy-zzzz telefonos
    public validarTel(){
    var tel = this.editarSucursal.telefono;
        var tamaño = tel.length;
        if(tamaño == 3){
            var parent = "("+tel+")";
            this.editarSucursal.telefono = parent;
        }
        if(tamaño==8){
            var guion = tel + "-";
            this.editarSucursal.telefono = guion;
        }
    }
      
  

}
