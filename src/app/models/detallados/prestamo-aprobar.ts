export class PrestamoAprobar {
   
        constructor(
            public idprestamo:number,
            public idcliente:number,
            public idnegocio:number,
            public idsucursal:number,
            public fecha_solicitud:string,
            public monto_solicitado:number,
            public monto_interes:number,
            public monto_conInteres:number,
            public empleado_captura:string,
            public tipo_credito:number,
            public status:string,
            public fecha_aprobacion:string,
            public monto_atraso:number,
            public tiempo:number,
            public interes:number,
            public cliente_nombre:string,
            public cliente_app_pat:string,
            public cliente_app_mat:string,
            public cliente_negocio:string,
            public cliente_telefono:string, 
            public creditos_descripcion:string,
            public cliente_nombres:string,       
            public tipo_negocio:number    
                    
        ){}
}
