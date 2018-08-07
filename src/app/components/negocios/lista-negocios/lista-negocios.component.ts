import { Component, OnInit } from '@angular/core';
import {Negocio} from '../../../models/negocio';
import {NegociosService} from '../../../services/negocios.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-lista-negocios',
  templateUrl: './lista-negocios.component.html',
  styleUrls: ['./lista-negocios.component.css'],
  providers:[NegociosService]
})
export class ListaNegociosComponent implements OnInit {
    public titulo:string;
    public result:any;

    public negocios:Array<Negocio>;
    public editarNegocio:Negocio;


    public pag:number; //numero de la pagina en que se encuentra
    public numRow:number;//numero de rows
    public numPag:number; //numero de paginas
    public arrayPag:Array<number>; //array que guardara el numero de paginas



    constructor(
        // private _route:ActivatedRoute,
        // private _router: Router,
        // private _negociosService:NegociosService
        private _negociosService:NegociosService
    ){
        this.titulo='Negocios'
        this.editarNegocio = new Negocio(0,0,'','','',0,'');
        this.negocios = [];
        this.arrayPag=[];
        this.pag=1;
    } 

    ngOnInit(){
        this.ObtenerNegocios();
    }

    public ObtenerNegocios(){
        this._negociosService.getNegocios().subscribe(
            result=>{
                if(result['result']){
                    this.result=result;
                    this.calcularPaginacion();
                }else{
                    console.log(result);
                }
            });
    }

    public mostrarNegocio(negocio:Negocio){
        this.editarNegocio = negocio;
    }

    public guardarCambios(){
        console.log(this.editarNegocio);
        this._negociosService.updateNegocio(this.editarNegocio).subscribe(
            result=>{
                if(result['result']){
                    this.result=result['result'];
                    this.negocios=result['result'] as Negocio[];
                    this.ObtenerNegocios();
                    console.log(this.negocios);
                }else{
                    console.log(result);
                }
            }
        );
    }

    public limpiarForm(form:NgForm){
        form.reset();
        this.editarNegocio= new Negocio(0,0,'','','',0,'');
        this.ObtenerNegocios;
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
        this.negocios=[];
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
            this.negocios[i]=this.result.result[index];
            index++;
        }
        console.log(this.negocios);
    }





}