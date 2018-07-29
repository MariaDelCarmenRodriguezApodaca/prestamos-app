export class Encuesta{
        
    constructor(
        public idencuesta:number,
        public idcliente:number,
        public fecha:string,
        public representante:number, //Cobrador
        public nombre_ruta:string,
        public nombre_cliente:string,
        public fecha_nacimiento:string,
        public edad:string,
        public comprobante_envia:string,
        public domicilio:string,
        public domicilio_propio_rentado:string,
        public dependientes_economicos:number,
        public telefono:string,
        public monto_solicitado:string,
        public monto_autorizado:string,
        public idnegocio:number,//Negocio del cliente
        public giro_negocio:string,
        public ingresos_semanales:string, //Del Negocio
        public propietario_o_empleado:string,
        public antiguedad_negocio:string,
        public contrato_arrendamiento:string,
        public ubicacion:string,
        public hora_laboran:string,
        public nombre_aval:string,
        public antiguedad_conocerse:string,
        public telefono_aval:string,
        public nombre_familiar:string,
        public parentesco:string,
        public telefono_familiar:string,
        public como_supo:string,//de los prestamos
        public status:string,
    ){}
}