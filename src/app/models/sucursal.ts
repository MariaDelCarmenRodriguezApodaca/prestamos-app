export class Sucursal{
    constructor(
        public idsucursal: number,
        public nombre: string,
        public callenum: string,
        public colonia: string,
        public poblacion: string,
        public municipio: string,
        public estado: string,
        public status: number,
        public hora_inicio: string,
        public hora_fin: string,
        public encargado: string,
        public telefono: number,
        // public id_empresa: number
    ){}
}