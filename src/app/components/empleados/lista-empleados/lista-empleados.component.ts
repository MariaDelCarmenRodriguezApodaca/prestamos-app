import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../services/empleados.service';
import { Empleado } from '../../../models/empleado';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
  providers:[EmpleadosService]
})
export class ListaEmpleadosComponent implements OnInit {
  public titulo:string;

    public result:any //resultado de la peticion http

    public empleados:Array<Empleado>; //arreglo de empleados 
    public empleados_alta:Array<any>=[]; //arreglo de empleados en alta
    public empleados_baja:Array<any>=[]; //arreglo de empleados en baja

    public info_empleado:Empleado;
    public nuevoEmpleado:Empleado;

    public pag:number; //numero de la pagina en que se encuentra
    public numRow:number;//numero de rows
    public numPag:number; //numero de paginas
    public arrayPag:Array<number>=[]; //array que guardara el numero de paginas

    public verTod:boolean;


    constructor(
        private _empleadosService:EmpleadosService
    ){
        this.titulo='Se Arranco el componente EmpleadoComponent';
        this.info_empleado=new Empleado(0,'','','','','','','','','','',0,0,'','','','',0);
        this.nuevoEmpleado=new Empleado(0,'','','','','','','','','','',0,0,'','','','',0);
        this.pag=1;
        this.verTod=true;

    }
    
    ngOnInit(){
        console.log(this.titulo);
        this.obtenerEmpleados();
        
    }

    public obtenerEmpleados(){
        // Ejecutar metodo getEmpleados del servicio
        this._empleadosService.getEmpleado().subscribe(
            result => {
                //console.log(result);
                if(!result['result']){
                    console.log(result);
                }else{
                    this.result = result;
                    console.log(this.result);
                    this.verTodos();
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
                }else{
                    console.log(`Error al actualizar el empleado: ${res}`);
                    this.obtenerEmpleados();
                }
            });
        
    }




    public verTodos(){
        this.verTod=true
        this.empleados = this.result.result;
        this.calcularPaginacion();
    }
    public verAlta(){
        this.verTod=false;
        this.empleados=[];
        console.log('--------------->',this.result.result[0].status);
        var indice = 0;
        for(let i=0; i < this.numRow; i++){
            if(this.result.result[i].status=='Activo'){
                console.log(`Empleado de alta: ${this.result.result[i]}`);
                this.empleados[indice]=this.result.result[i];
                indice ++;
            }
        }
    }
    public verBaja(){
        this.verTod=false;
        this.empleados=[];
        var indice = 0;
        for(let i=0; i < this.numRow; i++){
            if(this.result.result[i].status=='Inactivo'){
                console.log(`Empleado de baja: ${this.result.result[i]}`);
                this.empleados[indice]=this.result.result[i];
                indice ++;
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
        this.empleados=[];
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
            this.empleados[i]=this.result.result[index];
            index++;
        }
        console.log(this.empleados);
    }
    
    public limpiarForm(form:NgForm){
        form.reset();
        this.nuevoEmpleado=new Empleado(0,'','','','','','','','','','',0,0,'','','','',0);
    }


}