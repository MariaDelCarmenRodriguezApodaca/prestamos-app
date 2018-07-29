//el metodo injectable para poder injectar el servicio a un componente
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
//nuestro modelo de produducto
import { Empleado } from '../models/empleado';
//las configuraciones globales que creamos
import { GLOBAL } from './global';
//usamos el decorador injectable

@Injectable()
export class EmpleadosService{

	public url:string;

	constructor(
		public _http:HttpClient
	){
		this.url = GLOBAL.url;
	}

	public getEmpleado(){
		console.log('se corrio getEmpleado()');
		return this._http.get(this.url+'empleados/get')
	}


	public addEmpleado(empleado:Empleado){
		console.log('se corrio addEmpleado()');
		return this._http.post(this.url+'empleados/nuevo',empleado)
		//return this._http.post(this.url+'empleados/nuevo', empleado);
	}

	public updateEmpleado(empleado:Empleado){
		console.log('se corrio updateEmpleado()');
		return this._http.put(this.url+`empleados/update/${empleado.idempleado}`,empleado);
	}
	
	public login(usuario,password){
		console.log('Se corrio login()');
		
		return this._http.post(this.url+'empleados/login',{usuario:usuario,password:password});
	}
}


// constructor(private _http:HttpClient){
// 	this.url=GLOBAL.url;
// }

// public getGirosNegocios(){
// 	console.log(`Se corrio getGirosNegocios()`);
// 	return this._http.get(this.url+'giro_negocios/get');
// }

// public getGirosConPag(pag:number){
// 	console.log(`Se corrio getGirosConPag()`);
// 	return this._http.get(this.url+'giro_negocios/getPag/'+pag);
// }

// public addGiro(giro:GiroNegocio){
// 	return this._http.post(this.url+'giro_negocios/nuevo',giro);
// }

// public updateGiro(giro:GiroNegocio){
// 	return this._http.put(this.url+`giro_negocios/update/${giro.idgiro}`,giro);
// }

