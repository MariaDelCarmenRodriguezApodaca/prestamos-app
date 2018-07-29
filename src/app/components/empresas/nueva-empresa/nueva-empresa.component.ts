import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { EmpresasService } from '../../../services/empresas.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styleUrls: ['./nueva-empresa.component.css'],
  providers:[EmpresasService]
})
export class NuevaEmpresaComponent implements OnInit {
  public titulo:string;
  public nuevaEmpresa: Empresa;

  constructor(
      private _empresaService: EmpresasService
  ){
      this.titulo='Añadir una nueva Empresa'
      this.nuevaEmpresa = new Empresa (0,'','','');
  }

  ngOnInit(){
      console.log(this.titulo);
  }

  public addEmpresa(){
      this._empresaService.addEmpresa(this.nuevaEmpresa).subscribe(
          result=>{
             if(result['result']){
                 console.log('SE guardo empresa');
              }else{
                  console.log('ERROR al guardar empresa');
                  console.log(result['result']);
              }
      });
  }

  public limpiarForm(form:NgForm){
      form.reset();
      this.nuevaEmpresa=new Empresa (0,'','','');
  }
}

// public idempresa:number,
// public razon_social:string,
// public direccion:string,
// public descripcion:string