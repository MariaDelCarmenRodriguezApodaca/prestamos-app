export class Prestamo{
    constructor(
        public idprestamo:number,
        public idcliente:number,
        public idnegocio:number,
        public idsucursal:number,
        public idempresa:number,
        public fecha_solicitud:string,
        public monto_solicitado:number,
        public monto_interes:number,
        public monto_conInteres:number,
        public empleado_captura:number,
        public tipo_credito:number,
        public status:string,
        public fecha_aprobacion:string,
        public monto_atraso:number,
        public tiempo:number,
        public interes:number,
        public monto_aprobado:string
    ){}
}