//importamos el metodo injectable para poder injectar el servicio
import {Injectable} from '@angular/core';
//los metodos necesarios para hacer la peticion http
import {HttpClient} from '@angular/common/http';
//nuestro modelo de clientes
import {Cliente} from '../models/cliente';
//configuraciones globales
import {GLOBAL} from './global';

@Injectable()
export class ClientesService{
    public url:string;

    constructor(public _http:HttpClient){
        this.url=GLOBAL.url;
    }

    public getClientes(){
        console.log(`se corrio getCliente()`);
        return this._http.get(this.url+'clientes/get');
    }

    public subirImg(files:File, name: string, idCliente:string){
        const formData: FormData = new FormData();
        formData.append(name, files, files.name);
        console.log('subir imagenes, el formData es: ',formData);
        return this._http.post(this.url+'clientes/imagen_ine/'+idCliente, formData);
    }
    
    public addCliente(cliente:Cliente){
        console.log(`Se corrio addcliente()`);
        return this._http.post(this.url+'clientes/nuevo',cliente)
    }
}
