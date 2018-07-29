//importamos el metodo injectable para poder injectar el servicio
import {Injectable} from '@angular/core';
//los metodos necesarios para hacer la peticion http
import {HttpClient} from '@angular/common/http';
//nuestro modelo de cobros
import {Prestamo} from '../models/prestamo';

import {PrestamoAprobar} from '../models/detallados/prestamo-aprobar';
//configuraciones globales
import {GLOBAL} from './global';

@Injectable()
export class PrestamosService{
    public url:string;
    
    constructor(public _http:HttpClient){
        this.url=GLOBAL.url;
    }

    public getPrestamos(){
        console.log(`se corrio getPrestamos()`);
        return this._http.get(this.url+'prestamos/get');
    }
    
    public addPrestamos(prestamo:Prestamo){
        console.log('Se corrio addPrestamos()');
        return this._http.post(this.url+`prestamos/nuevo`,prestamo);
    }
    
    public updatePrestamo(prestamo:Prestamo){
        console.log(`Se corrio updatePrestamo()`);
        return this._http.put(this.url+`prestamos/update/${prestamo.idprestamo}`,prestamo);
    }

    public PrestamosXAprobar(){
        console.log(`Se corrio aprobarPrestamo()`);
        return this._http.get(this.url+'prestamos/get/sin_aprobar/');
    }

    public aprobarRechazar(prestamo){
        return this._http.put(this.url+`prestamos/aprobar_rechazar/${prestamo.idprestamo}`,prestamo);
    }

    
    
}
