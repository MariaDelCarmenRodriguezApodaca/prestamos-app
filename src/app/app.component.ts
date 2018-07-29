import { Component } from '@angular/core';
import { EmpleadoLog } from './empleado-log';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  public empleadoLog:EmpleadoLog;
  public mostrar:boolean;
  public empleado_log;
  
  constructor(
    private router:Router
   
  ){
    this.empleadoLog = new EmpleadoLog();
    this.mostrar=(localStorage.getItem('empleado_log')) ?true :false;
    this.empleado_log=this.empleadoLog.getEmpleadoLog();
    console.log(this.empleado_log);
  }

  public salir(){
    localStorage.clear();
    localStorage.removeItem('empleado_log');
    this.mostrar=false;
    this.router.navigate(['/login']);
    
  }
}
