import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { RutasService } from '../../../services/rutas.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { SucursalesService } from '../../../services/sucursales.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nueva-ruta',
  templateUrl: './nueva-ruta.component.html',
  styleUrls: ['./nueva-ruta.component.css'],
  providers:[RutasService, EmpleadosService, SucursalesService]
})
export class NuevaRutaComponent implements OnInit {
  public titulo:string;
  public nuevaRuta: Ruta;

  // Para llenar select 
  public empleados:any;
  public sucursales:any;

  constructor(
      private _sucursalService:SucursalesService,
      private _empleadosService:EmpleadosService,
      private _rutasService:RutasService
  ){
      this.titulo='Añadir una Nueva Ruta'
      this.nuevaRuta = new Ruta(0,'','',0,'');
  }

  ngOnInit(){
      console.log(this.titulo);  
      this.obtenerSucursales();
      this.obtenerEmpleados();      
  }  
  
  public addSucursal(){
      console.log(this.nuevaRuta);
      this._rutasService.addRuta(this.nuevaRuta).subscribe(
          res=>{
              if(res['result']){
                  console.log(res);
                  alert('Ruta guardada con exito');
              }
              else{
                  console.log(`Error desde cliente al añadir sucursal ${res}`)
              }
          });
  }


  public limpiarForm(form:NgForm){
      form.reset();
      this.nuevaRuta=new Ruta(0,'','',0,'');
  }


  // Para llenar select: 
  public obtenerSucursales(){
      this._sucursalService.getSucursales().subscribe(
          result=>{
              if(result['result']){
                  this.sucursales=result['result'];
                  console.log(this.sucursales);
              }
          });
  }
  public obtenerEmpleados(){
      this._empleadosService.getEmpleado().subscribe(
          result=>{
              if(result['result']){
                  this.empleados=result['result'];
                  console.log(this.empleados);
              }
          });
  }
}