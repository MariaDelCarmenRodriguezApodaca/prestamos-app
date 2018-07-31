//importamos el metodo injectable para poder injectar el servicio
import {Injectable} from '@angular/core';
//los metodos necesarios para hacer la peticion http
import {HttpClient} from '@angular/common/http';
//nuestro modelo de sucursales
import {Ruta} from '../models/ruta';
//configuraciones globales
import {GLOBAL} from './global';
import { RutaCobrador } from '../models/ruta-cobrador';


@Injectable({
  providedIn: 'root'
})
export class RutasService {
  public url:string;
  constructor(public _http:HttpClient){
      this.url=GLOBAL.url;
  }

  public getRutas(){
      console.log(`se corrio getRutas()`);
      return this._http.get(this.url+'rutas/get');
  }

  public addRuta(ruta:Ruta){
      console.log('Se corrio addRuta()');
      return this._http.post(this.url+`rutas/nueva`,ruta);
  }
  
  public updateRuta(ruta:Ruta){
      console.log(`Se corrio updateRuta()`);
      return this._http.put(this.url+`rutas/update/${ruta.idruta}`,ruta);
  }

  public addRutaCobrador(rutaCobrador:RutaCobrador){
    console.log('Se corrio addRutaCobrador()');
    return this._http.post(this.url+`rutas/add_ruta_cobrador`,rutaCobrador);
  }

  public getRutasCobrador(){
    console.log('Se corrio getRutasCobrador()');
      return this._http.get(this.url+`rutas/get_ruta_cobrador`);
  }

  public getRutasDetalles(){
    console.log('Se corrio getRutasDetalles()');
      return this._http.get(this.url+`rutas/get_detalles`);
  }
}
