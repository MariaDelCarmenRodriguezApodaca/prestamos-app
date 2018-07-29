import { Component, OnInit } from '@angular/core';
import { Cliente} from '../../../models/cliente';
import { NgForm } from '@angular/forms';
import {ClientesService} from '../../../services/clientes.service';
@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
  providers:[ClientesService]
})
export class NuevoClienteComponent implements OnInit {

  public titulo:string;
  public nuevoCliente: Cliente;

  constructor(
      private _clienteService:ClientesService
  ){
      this.titulo='Se arranco el componente ClienteNuevoComponent';
      this.nuevoCliente= new Cliente(0,'','','','','','','','','',0,'','',0,0);
      
  }
  ngOnInit(){
      console.log(this.titulo);
  }

  

  public addCliente(){
      // `localhost/clientes/nuevo`
      this._clienteService.addCliente(this.nuevoCliente).subscribe(
          result=>{
              if(result['result']){
                  console.log('Cliente Añadido con exito');
                  console.log(result);
              }else{
                  console.log(`Error al añadir a cliente, el resultado fue`);
                  console.log(result);
              }
      });
  }

  public limpiarForm(form:NgForm){
      form.reset();
      this.nuevoCliente=new Cliente(0,'','','','','','','','','',0,'','',0,0);
  }

  

} 