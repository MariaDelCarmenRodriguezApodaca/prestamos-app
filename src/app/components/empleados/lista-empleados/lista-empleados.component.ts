import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../services/empleados.service';
import { Empleado } from '../../../models/empleado';
import { NgForm } from '@angular/forms';
import { EmpleadoDetalle } from '../../../models/detallados/empleado-detalle';
import { Empresa } from '../../../models/empresa';
import { Sucursal } from '../../../models/sucursal';
import { EmpresasService } from '../../../services/empresas.service';
import { SucursalesService } from '../../../services/sucursales.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
  providers:[EmpleadosService,EmpresasService,SucursalesService]
})
export class ListaEmpleadosComponent implements OnInit {
  public titulo:string;

    public result:any //resultado de la peticion http

    public empleados:Array<Empleado>; //arreglo de empleados
    public empleadosDetalles:Array<EmpleadoDetalle>; 
    public empleados_alta:Array<any>=[]; //arreglo de empleados en alta
    public empleados_baja:Array<any>=[]; //arreglo de empleados en baja

    public info_empleado:Empleado;
    public nuevoEmpleado:Empleado;
    public info_empleado_detallado:EmpleadoDetalle;

    public pag:number; //numero de la pagina en que se encuentra
    public numRow:number;//numero de rows
    public numPag:number; //numero de paginas
    public arrayPag:Array<number>=[]; //array que guardara el numero de paginas

    public verTod:boolean;
    public verSucursalId:string;

    // Para llenar select
    public empresas:Empresa;
    public sucursales:Sucursal;


    constructor(
        private _empleadosService:EmpleadosService,
        private _empresaService:EmpresasService,
        private _sucursalesService:SucursalesService,
        private toastr : ToastrService
    ){
        this.titulo='Se Arranco el componente EmpleadoComponent';
        this.info_empleado=new Empleado(0,'','','','','','','','','','','',0,0,'','','','',0);
        this.nuevoEmpleado=new Empleado(0,'','','','','','','','','','','',0,0,'','','','',0);
        this.info_empleado_detallado= new EmpleadoDetalle(0,'','','','','','','','','','','','','','','',0,0,'',0,'');
        this.pag=1;
        this.verTod=true;
        this.empleadosDetalles=[];
        this.verSucursalId='$';

    }
    
    ngOnInit(){
        console.log(this.titulo);
        this.obtenerEmpleados();
        // Parra llenar select
        this.ObtenerEmpresas();
        this.ObtenerSucursales();
        
    }

    public obtenerEmpleados(){
        // Ejecutar metodo getEmpleados del servicio
        this._empleadosService.getEmpleadoDetalle().subscribe( result=>{
            if(result['result']){
                this.result = result;
                console.log(this.result);
                this.verTodos();
            }else{
                this.empleados = result['result'];
            }
            
        })
        this._empleadosService.getEmpleado().subscribe(
            result => {
                //console.log(result);
                if(!result['result']){
                    console.log(result);
                }else{
                    this.empleados = result['result'];
                }
            });
    }


    public actualizarEmpleado(){
        console.log(`Se actualizara:`, this.info_empleado);
        this._empleadosService.updateEmpleado(this.info_empleado).subscribe(
            res=>{
                if(res['result']){
                    console.log(`Empleado Actualizado con exito`);
                    this.obtenerEmpleados();
                    this.toastr.success('Empleado actualizado','Exito');
                }else{
                    console.log(`Error al actualizar el empleado: ${res}`);
                    this.obtenerEmpleados();
                    alert('Error!!! Fallo al intentar actualizar un empleado...');
                }
            });
        
    }




    public verTodos(){
        this.verTod=true
        this.empleadosDetalles = this.result.result;
        this.calcularPaginacion();
    }
    public verAlta(){
        this.verTod=false;
        this.empleadosDetalles=[];
        console.log('--------------->',this.result.result[0].empleado_status);
        var indice = 0;
        for(let i=0; i < this.numRow; i++){
            if(this.result.result[i].empleado_status=='Activo'){
                console.log(`Empleado de alta: ${this.result.result[i]}`);
                this.empleadosDetalles[indice]=this.result.result[i];
                indice ++;
            }
        }
    }
    public verBaja(){
        this.verTod=false;
        this.empleadosDetalles=[];
        var indice = 0;
        for(let i=0; i < this.numRow; i++){
            if(this.result.result[i].empleado_status=='Inactivo'){
                console.log(`Empleado de baja: ${this.result.result[i]}`);
                this.empleadosDetalles[indice]=this.result.result[i];
                indice ++;
            }
        }
    }

    public verXSucursal(){
        if(this.verSucursalId=='$'){
            this.verTodos();
        }else{
            this.verTod=false;
            this.empleadosDetalles=[];
            var indice = 0;
            for(let i=0; i < this.numRow; i++){
                if(this.result.result[i].sucursal_idsucursal==this.verSucursalId){
                    this.empleadosDetalles[indice]=this.result.result[i];
                    indice ++;
                }
            }
        }
        
    }

    public infoEmpleado(id){
        for (let index = 0; index < this.numRow; index++) {
            if(this.empleados[index].idempleado==id){
                this.info_empleado=this.empleados[index];
            }
        }
        console.log(this.info_empleado);
    }
    public infoEmpleadoDetallado(empleado:EmpleadoDetalle){
        this.info_empleado_detallado = empleado;
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
        this.empleadosDetalles=[];
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
            this.empleadosDetalles[i]=this.result.result[index];
            index++;
        }
        console.log(this.empleadosDetalles);
    }
    
    public limpiarForm(form:NgForm){
        form.reset();
        this.nuevoEmpleado=new Empleado(0,'','','','','','','','','','','',0,0,'','','','',0);
    }

    //Validar (xxx)yyy-zzzz telefonos
    public validarTel(){
        var tel = this.info_empleado.telefono;
            var tamaño = tel.length;
            if(tamaño == 3){
                var parent = "("+tel+")";
                this.info_empleado.telefono = parent;
            }
            if(tamaño==8){
                var guion = tel + "-";
                this.info_empleado.telefono = guion;
            }
    }
    // Para llenar select
    // Para llenar select 
    public ObtenerEmpresas(){
        this._empresaService.getEmpresas().subscribe(
            result=>{
                if(result['result']){
                    this.empresas=result['result'];
                    console.log(this.empresas);
                }
            });
    }
    public ObtenerSucursales(){
    this._sucursalesService.getSucursales().subscribe(
        result=>{
            if(result['result']){
                this.sucursales=result['result'];
                console.log(this.sucursales);
            }
        });
    }


}