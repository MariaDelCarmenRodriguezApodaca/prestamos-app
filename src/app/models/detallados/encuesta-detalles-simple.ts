export class EncuestaDetallesSimple {
    constructor(
        // Datos de la encuesta
        public encuesta_idencuesta:number,
        public encuesta_fecha:string,
        public encuesta_idcliente:number,
        // datos del cliente
        public cliente_nombre:string,
        public cliente_app_pat:string,
        public cliente_app_mat:string,
        public cliente_telefono:string,
        // Datos del negocio
        public negocio_idnegocio:string,
        public negocio_nombre_negocio:string
    ){}
}
