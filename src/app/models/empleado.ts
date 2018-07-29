export class Empleado{
    
    constructor(
        public idempleado:number,
        public nombres:string,
        public app_pat:string,
        public app_mat:string,
        public callenum:string,
        public colonia:string,
        public estado:string,
        public municipio:string,
        public poblacion:string,
        public telefono:string,
        public fecha_alta:string,
        public negocio:number,//id de la empresa
        public sucursal:number,//id de la sucursal
        public usuario:string,
        public password:string,
        public status:string,//puede ser 1 o 0
        public puesto:string,//aqui va el id del puesto
        public derecho_esp:number//En duda
    ){}
}