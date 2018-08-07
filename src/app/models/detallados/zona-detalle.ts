export class ZonaDetalle {
    constructor(
        public zona_idzona:number,
        public zona_nombre:string,
        public zona_colonia:string,
        public zona_status:string,
        public sucursal_idsucursal:string,
        public sucursal_nombre:string,
        public empleado_idempleado:number,
        public empleado_nombres:string,
        public empleado_app_pat:string,
        public empleado_app_mat:string
    ){}
}
