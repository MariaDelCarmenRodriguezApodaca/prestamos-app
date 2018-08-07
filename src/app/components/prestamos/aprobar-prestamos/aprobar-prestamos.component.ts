import { Component, OnInit } from '@angular/core';
import {PrestamoAprobar} from '../../../models/detallados/prestamo-aprobar'; //importamo el modelo prestamoXaprobar para poder tener un esquema de que tipo sera nuestro arreglo de prestamos
import {PrestamosService} from '../../../services/prestamos.service'; //importamos el servicio prestamos que creamos para porder ejecutar gPrestamosXAprobar y obtener los prestamos del servidor
import { Prestamo } from '../../../models/prestamo';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-aprobar-prestamos',
  templateUrl: './aprobar-prestamos.component.html',
  styleUrls: ['./aprobar-prestamos.component.css'],
  providers:[PrestamosService]
})
export class AprobarPrestamosComponent implements OnInit {
    public titulo:string;

    public prestamos_detallados:Array<PrestamoAprobar>; //creamos un arreglo de tipo PrestamosXAprobar, es donde tendremos la lista de prestamos
    public result:any; //creamos una variable en donde guardaremos el resultado de la peticion  http que hicimos en el servicio

    public pag:number; //numero de la pagina en que se encuentra
    public numRow:number;//numero de rows
    public numPag:number; //numero de paginas
    public arrayPag:Array<number>=[]; //array que guardara el numero de paginas

    public info_prestamo_detallada:PrestamoAprobar;
    public editar_prestamo:any

    public montoEditado:string;
    public editarMonto:boolean;
    constructor(
        private _prestamosService:PrestamosService, //delcaramos el servicio en el contructor
        private toastr:ToastrService
    ){
        this.titulo='Aprobar Prestamo';
        this.pag=1;
        this.arrayPag=[];
        this.info_prestamo_detallada= new PrestamoAprobar(0,0,0,0,'',0,0,0,'',0,'','',0,0,0,'','','','','','','',0);
        this.editar_prestamo=  new Prestamo(0,0,0,0,0,'',0,0,0,0,0,'','',0,0,0,'');  
        this.prestamos_detallados=[]
        this.montoEditado=null;
        this.editarMonto=false;
    }
    
    ngOnInit(){
        this.getPrestamos(); //recien cargado el componente obtenemos los prestamamos X Aprobar , get prestamos es del componentee, no del servicio
        
    }

    public getPrestamos(){
        // Ejetutamos 
        this._prestamosService.PrestamosXAprobar().subscribe(
            result =>{
                if(result['result']){ //si nos regresa result.result
                    this.result = result; //guardamos en nuestra propiedad result lo que nos devolvio la peticion
                    console.log('si esxistio result.result',this.result);
                    this.calcularPaginacion();
                }else(
                    console.log('NO esxistio result.result')
                )
            });
    }

    public ver(info_prestamo:PrestamoAprobar){
        this.info_prestamo_detallada = info_prestamo;
        this.editar_prestamo=info_prestamo;
    }

    public editMonto(){
        this.editarMonto=true;
        this.toastr.success('Monto modificado','Exito');
    }
    

    public aprobar(prestamo:Prestamo){
        if(this.editarMonto){
            prestamo.monto_aprobado=this.montoEditado;
        }else{
            prestamo.monto_aprobado=String(prestamo.monto_solicitado);
        }
        prestamo.status='A';
        this._prestamosService.aprobarRechazar(prestamo).subscribe(
            result=>{
                if(result){
                    console.log('ok');
                    this.toastr.success('Prestamo aprobado','Exito');
                    this.getPrestamos();
                }else{
                    console.log('ERROR', result)
                }
            }
        )
        
    }
    public rechazar(prestamo:Prestamo){
        prestamo.monto_aprobado='0.00';
        prestamo.status='R';
        this._prestamosService.aprobarRechazar(prestamo).subscribe(
            result=>{
                if(result){
                    console.log('ok');
                    this.toastr.success('Prestamo rechazado','Exito');
                    this.getPrestamos();
                }else{
                    console.log('ERROR', result)
                }
            }
        )
    }
    

    public editar(){
        console.log('Se actualizaran los datos:' , this.editar_prestamo);
        this._prestamosService.updatePrestamo(this.editar_prestamo).subscribe(
            res=>{
                if(res['result']){
                    console.log(`Datos Actualizados con exito`);
                    this.getPrestamos();
                }else{
                    console.log(`Error al actualizar el Prestamo: ${res}`);
                    this.getPrestamos();
                }
            });
        
    }

    public infoPrestamoDetallado(info_prestamo){

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
        this.prestamos_detallados=[];
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
            this.prestamos_detallados[i]=this.result.result[index];
            index++;
        }
        console.log(this.prestamos_detallados);
    }



}