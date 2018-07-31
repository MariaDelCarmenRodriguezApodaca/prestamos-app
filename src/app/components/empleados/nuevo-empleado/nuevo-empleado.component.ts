import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../models/empleado';
import { EmpleadosService } from '../../../services/empleados.service';
import { NgForm } from '@angular/forms';
import { SucursalesService } from '../../../services/sucursales.service';
import { EmpresasService } from '../../../services/empresas.service';
import { Empresa } from '../../../models/empresa';
import { Sucursal } from '../../../models/sucursal';
import { ToastrModule, ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
    selector: 'app-nuevo-empleado',
    templateUrl: './nuevo-empleado.component.html',
    styleUrls: ['./nuevo-empleado.component.css'],
    providers:[EmpleadosService,EmpresasService,SucursalesService]
})
export class NuevoEmpleadoComponent implements OnInit {
    public titulo:string;
    public nuevoEmpleado:Empleado;

    // Para llenar select
    public empresas:Empresa;
    public sucursales:Sucursal;

    constructor(
        private _empleadoService:EmpleadosService,
        private _empresaService:EmpresasService,
        private _sucursalesService:SucursalesService,
        private toastr : ToastrService
    ){
        this.titulo='Se Arranco el componente EmpleadoNuevoComponent';
        this.nuevoEmpleado=new Empleado(0,'','','','','','','','','','','',0,0,'','','Activo','',0);
    }
    
    ngOnInit(){
        console.log(this.titulo);
        this.ObtenerEmpresas();
        this.ObtenerSucursales();
    }

    public addEmpleado(){
        console.log(this.nuevoEmpleado);
        this._empleadoService.addEmpleado(this.nuevoEmpleado).subscribe(
            res=>{
                if(res['result']){
                    this.toastr.success('Nuevo empleado agregado','Exito');
                    console.log(this.nuevoEmpleado);
                }else{
                    alert(`Error!!!, Fallo al intentar agregar un empleado...`);
                    console.log(this.nuevoEmpleado);
                    console.log(res);
                }
            });
    };


    public limpiarForm(form:NgForm){
        form.reset();
        this.nuevoEmpleado=new Empleado(0,'','','','','','','','','','','',0,0,'','','Activo','',0);
    }

    // Para llenar select 
    public ObtenerEmpresas(){
        this._empresaService.getEmpresas().subscribe(
            result=>{
                if(result['result']){
                    this.empresas=result['result'];
                    console.log(this.empresas);
                }
            });
    }
    public ObtenerSucursales(){
    this._sucursalesService.getSucursales().subscribe(
        result=>{
            if(result['result']){
                this.sucursales=result['result'];
                console.log(this.sucursales);
            }
        });
    }
    
    //Validar (xxx)yyy-zzzz telefonos
    public validarTel(){
    var tel = this.nuevoEmpleado.telefono;
        var tamaño = tel.length;
        if(tamaño == 3){
            var parent = "("+tel+")";
            this.nuevoEmpleado.telefono = parent;
        }
        if(tamaño==8){
            var guion = tel + "-";
            this.nuevoEmpleado.telefono = guion;
        }
    }
          
}

// 1public idempleado:number,
// 2public nombres:string,
// 3public app_pat:string,
// 4public app_mat:string,
// 5public callenum:string,
// 6public colonia:string,
// 7public estado:string,
// 8public municipio:string,
// 9public poblacion:string,
// 10public telefono:string,
// 11public fecha_alta:string,
// 12public negocio:number,//id de la empresa
// 13public sucursal:number,//id de la sucursal
// 14public usuario:string,
// 15public password:string,
// 16public status:number,//puede ser 1 o 0
// 17public puesto:number,//aqui va el id del puesto
// 18public derecho_esp:number//En duda