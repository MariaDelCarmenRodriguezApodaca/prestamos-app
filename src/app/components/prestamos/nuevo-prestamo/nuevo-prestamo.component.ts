import { Component, OnInit } from '@angular/core';
import {Prestamo} from '../../../models/prestamo';
import {PrestamosService} from '../../../services/prestamos.service';

import {ClientesService} from '../../../services/clientes.service';
import {NegociosService} from '../../../services/negocios.service';
import {TipoCreditosService} from '../../../services/tipo-creditos.service';
import {GLOBAL} from '../../../services/global';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-nuevo-prestamo',
  templateUrl: './nuevo-prestamo.component.html',
  styleUrls: ['./nuevo-prestamo.component.css'],
  providers:[PrestamosService,ClientesService,NegociosService,TipoCreditosService]
})
export class NuevoPrestamoComponent implements OnInit {
  public titulo:string;
  public nuevosprestamos:Prestamo;

  public empleado:number;
  public sucursal:number;
  
  // Para llenar select: 
  public clientes:any;
  public negocios:any;
  public tipos:any;
  public negociosCliente:Array<any>;


  constructor(
      private _prestamosService:PrestamosService,
      private _clientesService:ClientesService,
      private _negociosService: NegociosService,
      private _tiposCreditosService:TipoCreditosService
  ){
      this.titulo='Añadir un Nuevo Prestamo'
      this.nuevosprestamos = new Prestamo(0,0,0,0,0,'',0,0,0,0,0,'','',0,0,0,'');
      this.empleado = GLOBAL.id_user;
      this.sucursal = GLOBAL.id_sucursal;
  }

  ngOnInit() {
     console.log(this.titulo);

  // Ejecutamos metodos para llenar select: 
      this.getClientes();
      this.getTipos();
  }  

  public addPrestamo(){
      this.nuevosprestamos.idsucursal = this.sucursal;
      this.nuevosprestamos.empleado_captura = this.empleado;
      this._prestamosService.addPrestamos(this.nuevosprestamos).subscribe(
          result=>{
              if(result['result']){
                  console.log('Prestamo registrado con exito')
              }else{
                  console.log('Error al registrar prestamo')
                  console.log(result);
              }
          }
      )
  }



  // -----------------------------------------------------------------------------------------
  // Para llenar select*
  public getClientes(){
      this._clientesService.getClientes().subscribe(
          result =>{
             if(!result['result']){
                  console.log(result);
              }else{
                  this.clientes=result['result'];
                  console.log(this.clientes);
                  
              }
          }
      )
  }


  public seleccionarCliente(cliente){
      this.negocios =[];
      this._negociosService.getNegociosCliente(cliente).subscribe(
          result =>{
             if(!result['result']){
                  console.log(result);
              }else{
                  this.negocios=result['result'];
                  console.log(this.negocios);
                  
              }
          }
      )
  }


  public getTipos(){
      this._tiposCreditosService.getCreditos().subscribe(
          result =>{
             if(!result['result']){
                  console.log(result);
              }else{
                  this.tipos=result['result'];
                  console.log(this.negocios);
                  
              }
          }
      )
  }
  // -----------------------------------------------------------------------------------------


  public limpiarForm(form:NgForm){
      form.reset();
      this.nuevosprestamos=new Prestamo(0,0,0,0,0,'',0,0,0,0,0,'','',0,0,0,'');
  }


}