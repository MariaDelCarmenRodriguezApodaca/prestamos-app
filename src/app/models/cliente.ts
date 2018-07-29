export class Cliente{
    constructor(
        public idcliente:number,
        public nombres:string,
        public app_pat:string,
        public app_mat:string,
        public callenum:string,
        public colonia:string,
        public estado:string,
        public municipio:string,
        public poblacion:string,
        public telefono:string,
        public status:number,
        public imagen_direccion:string, //
        public imagen_ine:string, //direccion de la imagen en el servidor
        public credito_solicitado:number,//1=si tiene creditos, 0= no tiene creditos pendientes
        public cantidad_creditos:number //total de creditos que ha solicitado este cliente
    ){}
}

// "idcliente": 26,
// "nombres": "ROSSELY",
// "app_pat": "BARRERAS",
// "app_mat": "MIRANDA",
// "callenum": "PAJARITOS",
// "colonia": "EL RINCON",
// "estado": "Sinaloa",
// "municipio": "GUASAVE",
// "poblacion": "JUAN JOSÉ RIOS",
// "telefono": "6683909876,6681119143",
// "status": 1,
// "imagen_direccion": "",
// "imagen_ine": "",
// "credito_solicitado": null,
// "cantidad_creditos": 1