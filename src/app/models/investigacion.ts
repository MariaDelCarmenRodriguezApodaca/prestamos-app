export class Investigacion{
    constructor(
        public idinvestigacion:number,
        public fecha_investigacion:string,
        public zona:number,
        public cobrador_zona:number,
        public telefonos:string,
        public idcliente:number,
        public nombre_completo:string,
        public fecha_nacimiento:string,
        public edad:string,
        public estado_civil:string,
        public direccion_hogar:string,
        public hogar_propio_orentado:string,
        public numero_dependientes_economicos:number,
        public monto_credito:string,
        public tipo_comprobante:string,
        public direccion_negocio:string,
        public horario:string,
        public propietario_oempleado:string,
        public local_oambulante:string,
        public negocio_propio_orentado:string,
        public contrato_arrendamiento:string,
        public nombre_aval:string,
        public tiempo_conocerse:string,
        public telefono_aval:string,
        public nombre_familiar:string,
        public telefono_familiar:string,
        public parentezco_familiar:string,
        public como_supo:string
    ){}
}