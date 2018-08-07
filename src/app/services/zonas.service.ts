//importamos el metodo injectable para poder injectar el servicio
import {Injectable} from '@angular/core';
//los metodos necesarios para hacer la peticion http
import {HttpClient} from '@angular/common/http';
//nuestro modelo de sucursales
import {Zona} from '../models/zona';
//configuraciones globales
import {GLOBAL} from './global';


@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  public url:string;
  constructor(public _http:HttpClient){
      this.url=GLOBAL.url;
  }

  public getZonas(){
      console.log(`se corrio getZonas()`);
      return this._http.get(this.url+'zonas/get');
  }

  public addZona(zona:Zona){
      console.log('Se corrio addZona()');
      return this._http.post(this.url+`zonas/nueva`,zona);
  }
  
  public updateZona(zona:Zona){
      console.log(`Se corrio updateRuta()`);
      return this._http.put(this.url+`zonas/update/${zona.idzona}`,zona);
  }

  public getZonasDetalles(){
    console.log(`se corrio getZonasDetalles()`);
    return this._http.get(this.url+'zonas/get_detalles');
  }

 
}
