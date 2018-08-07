export class Negocio{
    constructor(
        public idnegocio:number,
        public idcliente:number,
        public nombre:string,
        public descripcion_giro:string, //id del giro del negocio
        public tipo:string, //ambulante establecimiento
        public idzona:number, //zona a la que pertenece el negocio
        public comentarios:string
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