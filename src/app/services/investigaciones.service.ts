import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import{HttpClient} from '@angular/common/http';
import { Investigacion } from '../models/investigacion';
// import {} from '../models';
@Injectable({
  providedIn: 'root'
})

export class InvestigacionesService {
  public url:string;

  constructor(
    public _http:HttpClient
  ){
    this.url = GLOBAL.url;
  }

  public getInvestigaciones(){
    console.log('Se corrio getInvestigaciones();');
    return this._http.get(this.url+'investigaciones/get');
  }

  public updateInvestigacion(investigacion:Investigacion){
    console.log('Se corrio updateInvestigacion();');
    var idinvestigacion = investigacion.idinvestigacion;
    return this._http.put(this.url+`investigaciones/update/${idinvestigacion}`,investigacion);
  }

  public getInvestigacionesDetalles(){
    console.log('Se corrio getInvestigacionesDetalles();');
    return this._http.get(this.url+'investigaciones/get_detalles');
  }


}
