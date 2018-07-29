import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados.service';
import {Empleado} from '../../models/empleado';
import { NgForm } from '@angular/forms';
import { EmpleadoLog } from '../../empleado-log';

// Toastr
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[EmpleadosService]
})
export class LoginComponent{
  titulo = 'app';
  public usuario='';
  public password="";
  public empleadoLog:EmpleadoLog;

  constructor(
    private _empleadoService:EmpleadosService,
    private toastr: ToastrService,
    private router:Router,
  ){
    this.empleadoLog = new EmpleadoLog();
  }

  public ingresar(form:NgForm){
      this._empleadoService.login(this.usuario,this.password).subscribe(
        result=>{
          if(result['result']!=""){
            location.reload();
            console.log(result['result']);
            // this.toastr.success(`Bienvenido ${result['result'][0].nombres}`);
            this.empleadoLog.setEmpleadoLog(result['result']);
            this.router.navigate(['/home']);
            this.toastr.success(`Bienvenido ${result['result'][0].nombres}`);
          }else{
            this.toastr.error('', 'Verifique su usuario y contraseña');
            console.log('El usuario y contraseña no existen');
          }
          console.log('okOKok');
      });
  		
  }
  public salir(){
  	    localStorage.clear();
  }
}