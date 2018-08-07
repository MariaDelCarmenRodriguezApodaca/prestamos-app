import { NumberValueAccessor } from "../../../../node_modules/@angular/forms/src/directives";

export class InvestigacionDetalles {
    constructor(
        public investigacion_idinvestigacion:number,
        public investigacion_fecha_investigacion:string,
        public investigacion_telefonos:string,
        public investigacion_idcliente:number,
        public investigacion_nombre_completo:string,
        public investigacion_fecha_nacimiento:string,
        public investigacion_edad:string,
        public investigacion_estado_civil:string,
        public investigacion_direccion_hogar:string,
        public investigacion_hogar_propio_orentado:string,
        public investigacion_numero_dependientes_economicos:number,
        public investigacion_monto_credito:string,
        public investigacion_tipo_comprobante:string,
        public investigacion_direccion_negocio:string,
        public investigacion_horario:string,
        public investigacion_propietario_oempleado:string,
        public investigacion_local_oambulante:string,
        public investigacion_negocio_propio_orentado:string,
        public investigacion_contrato_arrendamiento:string,
        public investigacion_nombre_aval:string,
        public investigacion_tiempo_conocerse:string,
        public investigacion_telefono_aval:string,
        public investigacion_nombre_familiar:string,
        public investigacion_telefono_familiar:string,
        public investigacion_parentezco_familiar:string,
        public investigacion_como_supo:string,
        public zona_idzona:number,
        public zona_nombre:string,
        public empleado_idempleado:number,
        public empleado_nombres:string,
        public empleado_app_pat:string,
        public empleado_app_mat:string
    ){}
}
