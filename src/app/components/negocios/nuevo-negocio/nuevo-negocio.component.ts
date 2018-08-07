import { Component, OnInit } from '@angular/core';
import { Negocio } from '../../../models/negocio';
import { NegociosService } from '../../../services/negocios.service';
import { GirosNegocioService } from '../../../services/giros-negocio.service';
import {ClientesService} from '../../../services/clientes.service';

import { NgForm } from '@angular/forms';
import { ZonasService } from '../../../services/zonas.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
@Component({
  selector: 'app-nuevo-negocio',
  templateUrl: './nuevo-negocio.component.html',
  styleUrls: ['./nuevo-negocio.component.css'],
  providers:[NegociosService,GirosNegocioService,ClientesService,ZonasService]
})
export class NuevoNegocioComponent implements OnInit {
    public titulo:string
    public nuevoNegocio: Negocio;

    // Parra llenar select: 
    public clientes:any;
    public zonas:any;

    constructor(
        private _negocioService: NegociosService,
        private _clientesService: ClientesService,
        private _zonasService:ZonasService,
        private toastr:ToastrService
    ){
        this.titulo='Añadir un Nuevo Negocio';
        this.nuevoNegocio = new Negocio(0,0,'','','',0,'');
    }
    ngOnInit(){
        console.log(this.titulo);
        this.getClientes();
        this.obtenerZonas();
    }

    public addNegocio(){
        this.toastr.info('Añadiendo negocio');
        this._negocioService.addNegocio(this.nuevoNegocio).subscribe(
            result=>{
                if(result['result']){
                    console.log('Negocio Añadido con exito');
                    this.toastr.success('Negocio añadido','Éxito');
                    console.log(result);
                }else{
                    console.log(`Error al añadir al Negocio, el resultado fue`);
                    console.log(result);
                }
        });
    }


    //--------------------------------------------------------------------------------------------------
    // Para llenar campos en el select 
    public getClientes(){
        this._clientesService.getClientes().subscribe(
            result =>{
                if(!result['result']){
                    console.log(result);
                }else{
                    this.clientes=result['result'];
                    console.log(this.clientes);
                    
                }
            }
        )
    }

    public obtenerZonas(){
    this._zonasService.getZonas().subscribe(result=>{
        if(result['result']){
            this.zonas=result['result'];
            console.log(this.zonas);
        }else{
            alert('Error!!!, No hay zonas resgistradas...')
        }
    });
    }

    // ----------------------------------------------------------------------------------------------
    public limpiarForm(form:NgForm){
        form.reset();
        this.nuevoNegocio=  new Negocio(0,0,'','','',0,'');
    }
}


    // "idnegocio": 17,
    // "idcliente": 26,
    // "nombre_negocio": "INSTITUTO DE PSICOLOGIA JJR",
    // "callenum": "NO. 6",
    // "colonia": "EL RINCON",
    // "estado": "Sinaloa",
    // "municipio": "GUASAVE",
    // "poblacion": "JUAN JOSE RIOS",
    // "foto_negocio": "uploads/46edb486-0496-46dc-966f-2be146a1df591.jpg",
    // "tipo_negocio": 1,
    // "giro_negocio": 5