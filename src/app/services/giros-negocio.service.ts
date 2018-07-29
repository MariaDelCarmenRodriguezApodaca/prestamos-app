import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GiroNegocio} from '../models/giro-negocio';
import {GLOBAL} from './global';

@Injectable()
export class GirosNegocioService{
	public url:string; 

	constructor(private _http:HttpClient){
		this.url=GLOBAL.url;
	}

	public getGirosNegocios(){
		console.log(`Se corrio getGirosNegocios()`);
		return this._http.get(this.url+'giro_negocios/get');
	}

	public getGirosConPag(pag:number){
		console.log(`Se corrio getGirosConPag()`);
		return this._http.get(this.url+'giro_negocios/getPag/'+pag);
	}

	public addGiro(giro:GiroNegocio){
		return this._http.post(this.url+'giro_negocios/nuevo',giro);
	}
	
	public updateGiro(giro:GiroNegocio){
		return this._http.put(this.url+`giro_negocios/update/${giro.idgiro}`,giro);
	}

	// public deleteGiro(giro:GiroNegocio){
	// 	return this._http.delete(this.url+`/${giro.idgiro}`);
	// }
}