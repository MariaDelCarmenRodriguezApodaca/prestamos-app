//importamos el metodo injectable para poder injectar el servicio
import {Injectable} from '@angular/core';
//los metodos necesarios para hacer la peticion http
import {HttpClient} from '@angular/common/http';
//nuestro modelo de clientes
import {Empresa} from '../models/empresa';
//configuraciones globales
import {GLOBAL} from './global';

@Injectable()
export class EmpresasService{
    public url:string;
    constructor(public _http:HttpClient){
        this.url=GLOBAL.url;
    }

    public getEmpresas(){
        console.log(`se corrio getEmpresas()`);
        return this._http.get(this.url+'empresas/get');
    }
    
    public addEmpresa(empresa:Empresa){
        console.log('Se corrio addEmpresa()');
        return this._http.post(this.url+`empresas/nueva`,empresa);
    }
    
    public updateEmpresa(empresa:Empresa){
        console.log(`Se corrio updateEmpresa()`);
        return this._http.put(this.url+`empresas/update/${empresa.idempresa}`,empresa);
    }
    
}
