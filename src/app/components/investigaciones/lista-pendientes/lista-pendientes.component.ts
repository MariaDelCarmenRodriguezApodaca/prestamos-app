import { Component, OnInit } from '@angular/core';
import { InvestigacionesService } from '../../../services/investigaciones.service';
import { Investigacion } from '../../../models/investigacion';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-lista-pendientes',
  templateUrl: './lista-pendientes.component.html',
  styleUrls: ['./lista-pendientes.component.css'],
  providers:[InvestigacionesService]
})
export class ListaPendientesComponent implements OnInit {
  public titulo:string;
  public investigaciones:Array<Investigacion>
  public investigacionSeleccionada:Investigacion;

  public otro:string;

  constructor(
    private _investigaciones_service:InvestigacionesService,
    private toastr:ToastrService
  ) {
    this.titulo = 'Investigaciones crediticias pendientes' 
    this.investigaciones=[];
    this.investigacionSeleccionada=new Investigacion(0,'',0,0,'',0,'','','','','','',0,'','','','','','','','','','','','','','','');
  }

  ngOnInit() {
    
    this.obtenerInvestigaciones();
  }

  public obtenerInvestigaciones(){
    
    this._investigaciones_service.getInvestigaciones().subscribe(
        result=>{
            if(result['result']){
                this.investigaciones=result['result'];
                console.log(this.investigaciones);
            }else{
                console.log(result);
            }
        });
        
  }

  public seleccionarInvestigacion(investigacion:Investigacion){
    
    this.investigacionSeleccionada = investigacion;
  }

  public guardarInvestigacion(){
    if(this.investigacionSeleccionada.como_supo=='Otro' ){
      this.investigacionSeleccionada.como_supo=this.otro;
    }
    console.log(this.investigacionSeleccionada);
    this._investigaciones_service.updateInvestigacion(this.investigacionSeleccionada).subscribe(result=>{
      if(result['result']){
        console.log(result);
        this.toastr.success('Informacion Guardada','Exito');
      }else{
        console.log(result);
        alert('Error!!!, Fallo al actualizar investigacion crediticia');
      }
      this.obtenerInvestigaciones();
    })
    
  }

  public limpiarForm(form:NgForm){
    form.reset();
    this.investigacionSeleccionada=new Investigacion(0,'',0,0,'',0,'','','','','','',0,'','','','','','','','','','','','','','','');
  }

  
  //Validar (xxx)yyy-zzzz telefonos
  public validarTelAval(){
    var tel = this.investigacionSeleccionada.telefono_aval;
        var tamaño = tel.length;
        if(tamaño == 3){
            var parent = "("+tel+")";
            this.investigacionSeleccionada.telefono_aval = parent;
        }
        if(tamaño==8){
            var guion = tel + "-";
            this.investigacionSeleccionada.telefono_aval = guion;
        }
    }
    public validarTelFam(){
      var tel = this.investigacionSeleccionada.telefono_familiar;
          var tamaño = tel.length;
          if(tamaño == 3){
              var parent = "("+tel+")";
              this.investigacionSeleccionada.telefono_familiar = parent;
          }
          if(tamaño==8){
              var guion = tel + "-";
              this.investigacionSeleccionada.telefono_familiar = guion;
          }
      }
}
