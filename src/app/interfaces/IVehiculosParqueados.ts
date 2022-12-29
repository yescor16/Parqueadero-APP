export interface IVehiculosParqueados {
    ID:number;
    id_tipovehiculo:number,
    vehiculo:string,
    id_propietario:number,
    propietario:string,
    placa:string,
    email:string,
    telefono:string,
    fecha_ingreso:string,
    fecha_salida:string,
    minutos_transcurridos:number,
    aplicaDescuento:boolean,
    valor_tarifa:number,
    valor_tiempo:number,
    numero_factura:string
}
