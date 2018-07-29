//importamos el metodo injectable para poder injectar el servicio
import {Injectable} from '@angular/core';
//los metodos necesarios para hacer la peticion http
import {HttpClient} from '@angular/common/http';
//nuestro modelo de clientes
import {Negocio} from '../models/negocio';
//configuraciones globales
import {GLOBAL} from './global';

@Injectable()
export class NegociosService{
    public url:string;
    constructor(public _http:HttpClient){
        this.url=GLOBAL.url;
    }

    public getNegocios(){
        console.log(`se corrio getNegocios()`);
        return this._http.get(this.url+'negocios/get');
    }

    public getNegociosCliente(idcliente){
        console.log(`se corrio getNegociosCliente()`);
        return this._http.get(this.url+'negocios/get_xcliente/'+idcliente);
    }
    
    public addNegocio(negocio:Negocio){
        console.log('Se corrio addNegocio()');
        return this._http.post(this.url+`negocios/nuevo`, negocio);
    }
    
    public updateNegocio(negocio:Negocio){
        console.log(`Se corrio updateEmpresa()`);
        return this._http.put(this.url+`negocios/update/${negocio.idnegocio}`,negocio);
    }
    
}
