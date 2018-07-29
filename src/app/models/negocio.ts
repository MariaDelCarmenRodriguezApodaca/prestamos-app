export class Negocio{
    constructor(
        public idnegocio:number,
        public idcliente:number,
        public nombre_negocio:string,
        public callenum:string,
        public colonia:string,
        public estado:string,
        public municipio:string,
        public poblacion:string, 
        public foto_negocio:string, //direccion en el servidor de la foto del negocio
        public tipo_negocio:string, //ambulante establecimiento
        public giro_negocio:number //id del giro del negocio
    ){}
}

// "idnegocio": 17,
// "idcliente": 26,
// "nombre_negocio": "INSTITUTO DE PSICOLOGIA JJR",
// "callenum": "NO. 6",
// "colonia": "EL RINCON",
// "estado": "Sinaloa",
// "municipio": "GUASAVE",
// "poblacion": "JUAN JOSE RIOS",
// "foto_negocio": "uploads/46edb486-0496-46dc-966f-2be146a1df591.jpg",
// "tipo_negocio": 1,
// "giro_negocio": 5