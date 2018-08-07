import { Component, OnInit } from '@angular/core';
import { Cliente} from '../../../models/cliente';
import { NgForm } from '@angular/forms';
import {ClientesService} from '../../../services/clientes.service';
import { ZonasService } from '../../../services/zonas.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
  providers:[ClientesService,ZonasService]
})

export class NuevoClienteComponent implements OnInit {

  public titulo:string;
  public nuevoCliente: Cliente;
  
  // Para añadir telefonos: 
  public tel:string;
  public telefonos:string;
  public arrayTelefonos:Array<any>;
  public habilitar:boolean;
  constructor(
      private _clienteService:ClientesService,
      private _zonasService:ZonasService
  ){
      this.titulo='Se arranco el componente ClienteNuevoComponent';
      this.nuevoCliente= new Cliente(0,'','','','','','',0);
      this.arrayTelefonos = [];
      this.telefonos = '';
      this.habilitar=false;
  }
  ngOnInit(){
      console.log(this.titulo);
  }

  public addCliente(){
      for(let i=0; i< this.arrayTelefonos.length; i++ ){
        this.telefonos += `, ${this.arrayTelefonos[i]}`;
      }
      console.log(this.telefonos);
      this.nuevoCliente.telefonos = this.telefonos;
      this._clienteService.addCliente(this.nuevoCliente).subscribe(
          result=>{
              if(result['result']){
                  console.log('Cliente Añadido con exito');
                  console.log(result);
              }else{
                  console.log(`Error al añadir a cliente, el resultado fue`);
                  console.log(result);
              }
              this.habilitar=false;
      });
  }

  public limpiarForm(form:NgForm){
      form.reset();
      this.nuevoCliente=new Cliente(0,'','','','','','',0);
      this.arrayTelefonos = [];
      this.tel = null;
  }



  public addTel(){
    this.arrayTelefonos.push(this.tel);
    this.tel = null;
    this.habilitar=true;
  }

  public validarTel(){
    var tel = this.tel;
    var tamaño = tel.length;
    if(tamaño == 3){
        var parent = "("+tel+")";
        this.tel = parent;
    }
    if(tamaño==8){
        var guion = tel + "-";
        this.tel = guion;
    }
  }
  

} 