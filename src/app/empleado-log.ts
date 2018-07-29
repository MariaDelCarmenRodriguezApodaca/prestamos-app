import { Empleado } from './models/empleado';
export class EmpleadoLog {
    public empleado_log:Empleado;
    constructor(){
        this.empleado_log= JSON.parse(localStorage.getItem('empleado_log')); 
    }
    public setEmpleadoLog(empleado:Empleado){
        // convertimos el json en cadena y lo guardamos en localstorage
        localStorage.setItem('empleado_log',JSON.stringify(empleado));
        this.empleado_log=empleado;
    }
    public getEmpleadoLog(){
        // actualizamos el empleado tomandolo de localstorage:
        if(localStorage.getItem('empleado_log')){
            this.empleado_log= JSON.parse(localStorage.getItem('empleado_log'))[0];
            return this.empleado_log;
        }else{
            return false;
        }
        
    }
}
