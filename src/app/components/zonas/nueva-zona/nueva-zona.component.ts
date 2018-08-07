import { Component, OnInit } from '@angular/core';
import { ZonasService } from '../../../services/zonas.service';
import { SucursalesService } from '../../../services/sucursales.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { ToastrModule, ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Ruta } from '../../../models/ruta';
import { Zona } from '../../../models/zona';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { Empleado } from '../../../models/empleado';

@Component({
  selector: 'app-nueva-zona',
  templateUrl: './nueva-zona.component.html',
  styleUrls: ['./nueva-zona.component.css'],
  providers: [ZonasService,SucursalesService,EmpleadosService]
})
export class NuevaZonaComponent implements OnInit {
  public titulo:string;
  public nuevaZona:Zona;
  //Para llenas select: 
  public sucursales:any;
  public empleados:Array<Empleado>; 

  constructor(
    private _zonasService: ZonasService,
    private _empleadosService: EmpleadosService,
    private _sucursalesService: SucursalesService,
    private toastr: ToastrService 
  ) { 
    this.titulo='Añadir Nueva Zona'
    this.nuevaZona = new Zona(0,'','',0,0,'');
    this.empleados=[];
  }

  ngOnInit() {
    this.obtenerSucursales();
    this.obtenerEmpleados();
  }


  public limpiarForm(form:NgForm){
    form.reset();
    this.nuevaZona=new Zona(0,'','',0,0,'');
  }

  public addZona(){
    console.log(this.nuevaZona);
    this._zonasService.addZona(this.nuevaZona).subscribe(
        res=>{
            if(res['result']){
                console.log(res);
                this.toastr.success('Zona guardada','Exito');
            }
            else{
                console.log(`Error desde cliente al añadir sucursal ${res}`);
                alert('Error!!!, fallo al guardar zona...');
            }
        });
  }


  // Para llenar select: 
  public obtenerSucursales(){
      this._sucursalesService.getSucursales().subscribe(
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

                  for(let i=0; i<result['result'].length; i++){
                    if(result['result'][i].puesto=='Cobrador'){
                      this.empleados.push(result['result'][i])
                    }
                  }

                  // this.empleados=result['result'];
                  console.log(this.empleados);
              }
          });
  }

}
