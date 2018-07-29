import { Component, OnInit } from '@angular/core';
import { EmpleadoLog } from '../../empleado-log'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public empleadoLog:EmpleadoLog;
  public empleado_log;
  constructor() { 
    this.empleadoLog = new EmpleadoLog();
    console.log(this.empleadoLog.getEmpleadoLog());
    this.empleado_log=this.empleadoLog.getEmpleadoLog();
  }

  ngOnInit() {
  }

}
