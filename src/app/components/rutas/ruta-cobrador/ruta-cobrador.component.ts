import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { RutasService } from '../../../services/rutas.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { RutaCobrador } from '../../../models/ruta-cobrador';
import { NgForm } from '../../../../../node_modules/@angular/forms';


@Component({
  selector: 'app-ruta-cobrador',
  templateUrl: './ruta-cobrador.component.html',
  styleUrls: ['./ruta-cobrador.component.css'],
  providers:[EmpleadosService,RutasService]
})
export class RutaCobradorComponent implements OnInit {
  public titulo:string;
  public nuevaRutaXCobrador:RutaCobrador;

  // Para llenar select: 
  public empleados:Array<any>;
  public rutas:any;
  


  // Para tabla: 
  public rutasXCobrador:Array<any>;

  constructor(
    private _empleadosService:EmpleadosService,
    private _rutasService:RutasService
  ) {
    this.nuevaRutaXCobrador = new RutaCobrador(0,0,0);
    this.empleados=[];
    this.rutasXCobrador=[];
  }

  ngOnInit() {
    console.log(this.titulo);  
    // Para llenar select
    this.obtenerEmpleados();
    this.obtenerRutas(); 
    this.obtenerRutasXCobrador();
  }

  public addRutaXCobrador(){
    console.log(this.nuevaRutaXCobrador);
    this._rutasService.addRutaCobrador(this.nuevaRutaXCobrador).subscribe(
      result=>{
        if(result['result']){
          console.log(result);
          this.obtenerRutasXCobrador();
          alert('Ruta para cobrador guardada con éxito');
        }
      });
  }

  public limpiarForm(form:NgForm){
    form.reset();
    this.nuevaRutaXCobrador=new RutaCobrador(0,0,0);
  }

  // Para llenar select:
  public obtenerEmpleados(){
    this._empleadosService.getEmpleado().subscribe(
        result=>{
            if(result['result']){
                var res=result['result'];
                for(let index=0 ; index < res.length ; index++){
                  if(res[index].puesto == 'Cobrador'){
                    this.empleados.push(res[index]);
                  }
                }
                console.log(this.empleados);
            }
        });    
  }
  public obtenerRutas(){
    this._rutasService.getRutas().subscribe(
      result=>{
        if(result['result']){
          this.rutas = result['result'];
          console.log(this.rutas);
        }
      });
  }


    // Para llenar tabla

  public obtenerRutasXCobrador(){
    this._rutasService.getRutasCobrador().subscribe(result=>{
      if(result['result']){
        this.rutasXCobrador= result['result'];
        console.log(this.rutasXCobrador);
      }
    });
  }



}
