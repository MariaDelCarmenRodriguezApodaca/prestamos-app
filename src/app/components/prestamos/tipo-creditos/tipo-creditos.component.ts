import { Component, OnInit } from '@angular/core';
import {TipoCredito} from '../../../models/tipo-credito';
import {TipoCreditosService} from '../../../services/tipo-creditos.service';
import {NgForm} from '@angular/forms'


@Component({
  selector: 'app-tipo-creditos',
  templateUrl: './tipo-creditos.component.html',
  styleUrls: ['./tipo-creditos.component.css'],
  providers:[TipoCreditosService]
})
export class TipoCreditosComponent implements OnInit {
  public titulo:string
	public result:any;

	public creditos:Array<TipoCredito>;
    public editarCreditos: TipoCredito; 
    

    public pag:number; //numero de la pagina en que se encuentra
    public numRow:number;//numero de rows
    public numPag:number; //numero de paginas
    public arrayPag:Array<number>; //array que guardara el numero de paginas


	constructor(
		private _tipoCreditoService:TipoCreditosService
	){
		this.titulo='Tipos de Creditos';
		this.editarCreditos = new TipoCredito(0,'','',0,0,0);
		this.arrayPag=[];
		this.pag=1;
	}
	ngOnInit(){
		this.ObtenerTipos();		
	}

	public ObtenerTipos(){
        this._tipoCreditoService.getCreditos().subscribe(
            result=>{
                if(result['result']){
                    this.result=result; 
                    this.calcularPaginacion();
                }else{
                    console.log(result);
                }
            });
    }
    
    public guardarCredito(){
        this._tipoCreditoService.addCreditos(this.editarCreditos).subscribe(
            res=>{
                if(res){
                    console.log(`Giro guardado con exito`);
                    this.ObtenerTipos();
                }
            });
    }
    //----------------------------------------------------------------
    
	public mostrarCreditos(credito:TipoCredito){
        this.editarCreditos = credito;
	}
	//-----------------------------------------------
	public guardarCambios(){
        console.log(this.editarCreditos);
        this._tipoCreditoService.updateCreditos(this.editarCreditos).subscribe(
            result=>{
                if(result['result']){
                    this.result=result['result'];
                    this.creditos=result['result'] as TipoCredito[];
                    this.ObtenerTipos();
                    console.log(this.creditos);
                }else{
                    console.log(result);
                }
            }
        );
    }
    
    public limpiarForm(form:NgForm){
        form.reset();
        this.editarCreditos=new TipoCredito(0,'','',0,0,0);
        this.ObtenerTipos;
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
        this.creditos=[];
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
            this.creditos[i]=this.result.result[index];
            index++;
        }
        console.log(this.creditos);
    }


}