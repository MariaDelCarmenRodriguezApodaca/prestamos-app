import { Component, OnInit } from '@angular/core';
import { ZonasService } from '../../../services/zonas.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { SucursalesService } from '../../../services/sucursales.service';
import { Empleado } from '../../../models/empleado';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { ZonaDetalle } from '../../../models/detallados/zona-detalle';
import { Zona } from '../../../models/zona';
import { NgForm } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-lista-zonas',
  templateUrl: './lista-zonas.component.html',
  styleUrls: ['./lista-zonas.component.css'],
  providers: [ZonasService,EmpleadosService,SucursalesService]
})
export class ListaZonasComponent implements OnInit {
  public titulo:string;
  public zonasDetalles:Array<ZonaDetalle>;
  public zonas:Array<Zona>;
  public editarZona:Zona;
  public result:any
  //Para llenas select: 
  public sucursales:any;
  public empleados:Array<Empleado>; 

  public pag:number; //numero de la pagina en que se encuentra
  public numRow:number;//numero de rows
  public numPag:number; //numero de paginas
  public arrayPag:Array<number>; //array que guardara el numero de paginas

  constructor(
    private _zonasService: ZonasService,
    private _empleadosService: EmpleadosService,
    private _sucursalesService: SucursalesService,
    private toastr: ToastrService 
  ) { 
    this.titulo = 'Lista de zonas ';
    this.zonas = [];
    this.empleados = [];
    this.zonasDetalles = [];
    this.editarZona = new Zona(0,'','',0,0,'');
    this.arrayPag=[];
    this.pag = 1;
  }

  ngOnInit() {
    this.obtenerSucursales();
    this.obtenerEmpleados();
    this.obtenerZonas();
    this.obtenerZonasDetalles();
  }

  public obtenerZonasDetalles(){
    this._zonasService.getZonasDetalles().subscribe(
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
  public obtenerZonas(){
      this._zonasService.getZonas().subscribe(
          result=>{
              if(result['result']){
                  this.zonas=result['result'];
              }else{
                  console.log(result);
              }
          });
  }

  public mostrarZona(id){
    for(let i=0; i<this.zonas.length ;i++){
        if(this.zonas[i].idzona==id){
            this.editarZona=this.zonas[i];
        }
    }
  }

  public guardarCambios(){
    console.log(this.editarZona);
    this._zonasService.updateZona(this.editarZona).subscribe(
        result=>{
            if(result['result']){
                this.toastr.success('Zona actualizada','Exito');
                this.result=result['result'];
                this.obtenerZonas();
                this.obtenerZonasDetalles();
                console.log(this.zonas);
               
            }else{
                console.log(result);
                alert('Error!!!, fallo al actualizar ruta...');
            }
        }
    );
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
                  console.log(this.empleados);
              }
          });
  }

  public limpiarForm(form:NgForm){
    form.reset();
    this.editarZona=new Zona(0,'','',0,0,'');
    this.obtenerZonas;
    this.obtenerZonasDetalles();

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
      this.zonasDetalles=[];
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
          this.zonasDetalles[i]=this.result.result[index];
          index++;
      }
      console.log(this.zonasDetalles);
  }

}
