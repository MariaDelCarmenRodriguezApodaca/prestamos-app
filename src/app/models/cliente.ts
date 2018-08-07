export class Cliente{
    constructor(
        public idcliente:number,
        public nombres:string,
        public app_pat:string,
        public app_mat:string,
        public telefonos:string,
        public imagen_direccion:string, //
        public imagen_ine:string, //direccion de la imagen en el servidor
        public status:number
    ){}
}

/**
"idcliente": 1,
"nombres": "Juan Pablo",
"app_pat": "Rodriguez ",
"app_mat": "Apodaca",
"telefonos": "(668)123-4672, (668)232-3421, (668)918-2837",
"imagen_direccion": "http://res.cloudinary.com/doxrlcgtc/image/upload/v1533242271/jjdmawdzqjukytjog2o0.png,jjdmawdzqjukytjog2o0",
"imagen_ine": "http://res.cloudinary.com/doxrlcgtc/image/upload/v1533242042/js73lfq1tdzyut9h5kuk.png,js73lfq1tdzyut9h5kuk",
"status": "Activo"
},
 */
