export class CobroDia {
    constructor(
        public cliente_idcliente:number,
        public cliente_nombres:string,
        public cliente_app_pat:string,
        public cliente_app_mat:string,
        public cliente_telefono:string,
        public negocio_idnegocio:number,
        public negocio_callenum:string,
        public negocio_colonia:string,
        public negocio_municipio:string,
        public negocio_poblacion:string,
        public negocio_tipo_negocio:string,
        public negocio_nombre_negocio:string,
        public cobro_idcobro:number,
        public cobro_cantidad_cobro:number,
        public cobro_fecha_cobro:string,
        public cobro_status:string,
        public prestamo_idprestamo:number,
        public prestamo_monto_solicitado:number,
        public prestamo_monto_conInteres:number,
        public prestamo_interes:number,
        public credito_idcredito:number,
        public credito_descripcion:string,
        public empleado_idempleado:number,
        public empleado_nombre:string 
    ){}
}