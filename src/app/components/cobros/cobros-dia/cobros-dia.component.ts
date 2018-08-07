import { Component, OnInit } from '@angular/core';
import {CobroDia} from '../../../models/cobro-dia';
import {CobrosService} from '../../../services/cobros.service';
import { ToastrModule, ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-cobros-dia',
  templateUrl: './cobros-dia.component.html',
  styleUrls: ['./cobros-dia.component.css'],
  providers:[CobrosService]
})
export class CobrosDiaComponent implements OnInit {
    
    public titulo:string;

    public result:any;
    public cobros_xdia:Array<CobroDia>;

    //para paginacion
    public pag:number; //numero de la pagina en que se encuentra
    public numRow:number;//numero de rows
    public numPag:number; //numero de paginas
    public arrayPag:Array<number>; //array que guardara el numero de paginas
    
    // Para selecionar cobro
    public cobroSeleccionado:CobroDia;
    public pagarCobroSeleccionado:CobroDia;

    // Para formulario de pago
    public pagoCompleto;
    public tipo_pago:string;
    public input_adelanto:string;
    public comentario:string;
    

    constructor(
        private _cobrosService:CobrosService,
        private toastr:ToastrService
    ){
        this.titulo = 'Cobros correspondientes al dia';
        this.arrayPag=[];
        this.pag=1;
        this.cobroSeleccionado= new CobroDia(0,'','','','',0,'','','','','','',0,0,'','',0,0,0,0,0,'',0,'');
        this.pagarCobroSeleccionado = new CobroDia(0,'','','','',0,'','','','','','',0,0,'','',0,0,0,0,0,'',0,'');
        this.comentario='';
    }

    ngOnInit(){
        this.obtenerCobrosXDia();
    }

    public obtenerCobrosXDia(){
        this._cobrosService.getCobrosXDia().subscribe(
            result =>{
                if(result['result']){
                    this.result = result;
                    this.pagoCompleto = result['completo'];
                    this.cobroSeleccionado= new CobroDia(0,'','','','',0,'','','','','','',0,0,'','',0,0,0,0,0,'',0,'');
                    this.pagarCobroSeleccionado = new CobroDia(0,'','','','',0,'','','','','','',0,0,'','',0,0,0,0,0,'',0,'');
                    this.comentario='';
                    this.calcularPaginacion();
                }else{
                    console.log('ERROR!! ---> result:',result);
                }
            }
        )
    }

    public seleccionarInfoCobroXDia(cobro:CobroDia){
        this.cobroSeleccionado = cobro;
        this.pagarCobroSeleccionado = cobro;
    }


    public pagar(){
        switch (this.tipo_pago) {
            case 'requerido':  
                this.toastr.info('Realizando pago requerido de: ' + this.cobroSeleccionado.cobro_cantidad_cobro);
                this._cobrosService.pagoRequerido(this.pagarCobroSeleccionado,this.comentario).subscribe(
                    result=>{
                        if(result){
                            this.toastr.success("Pago requerido realizado",'Exito');
                            this.obtenerCobrosXDia();
                        }else{
                            console.log('Error al pagar', result);
                            this.toastr.error("Error en pago requerido",'Error');
                        }
                    }
                );
                break;
            case 'completo':
                this.toastr.info('Realizando pago completo de: ' + this.pagoCompleto);
                this._cobrosService.pagoCompleto(this.pagarCobroSeleccionado,this.comentario).subscribe(
                    result=>{
                        if(result){
                            this.toastr.success("Pago completo realizado",'Exito');
                            this.obtenerCobrosXDia();
                        }else{
                            console.log('Error al pagar', result);
                            this.toastr.error("Error en pago completo",'Error');
                        }
                    }
                );
                break;
            case 'adelanto':
                this.toastr.info('Realizando pago exaxto de: ' + this.input_adelanto );
                this._cobrosService.pagoExacto(this.pagarCobroSeleccionado,this.comentario,this.input_adelanto).subscribe(
                    result=>{
                        if(result){
                            this.toastr.success("Pago exacto realizado",'Exito');
                            this.obtenerCobrosXDia();
                        }else{
                            console.log('Error al pagar', result);
                            this.toastr.error("Error en pago adelantado",'Error');
                        }
                    }
                )
                break;
        }
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
        this.cobros_xdia=[];
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
            this.cobros_xdia[i]=this.result.result[index];
            index++;
        }
        console.log(this.cobros_xdia);
    }

    
}