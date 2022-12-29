import { IIngreso } from '../interfaces/IIngreso';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

constructor( private http: HttpClient) {
  
 }

 obtenerTipoVehiculo(): Observable<any>{
  let url = "/api/TipoVehiculo/ObtenerListadoTiposVehiculos";
  let token = "Bearer [Aquí especifica tu token]";
  let _headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE').set('strict-origin-when-cross-origin', 'http://localhost:44367');

  return this.http.get<any>(url, {headers: _headers});
}
obtenerTarifas(tpVehiculo:number): Observable<any>{
  let url = "/api/TarifaVehhiculo/ObtenerTarifaPorVehiculo/" + tpVehiculo ;
  let token = "Bearer [Aquí especifica tu token]";
  let _headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE').set('strict-origin-when-cross-origin', 'http://localhost:44367');

  return this.http.get<any>(url, {headers: _headers});
}
RegistrarIngreso(ingreso: IIngreso){
  let url = "/api/RegistroParqueadero/IngresoParqueadero";
  let token = "Bearer [Aquí especifica tu token]";
  let _headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE').set('strict-origin-when-cross-origin', 'http://localhost:44367');
  let data = {
    id_tipovehiculo : ingreso.id_tipovehiculo,
    id_propietario : ingreso.id_propietario,
    propietario : ingreso.propietario,
    email : ingreso.email,
    telefono : ingreso.telefono,
    minutos_transcurridos : ingreso.minutos_transcurridos,
    fecha_ingreso : ingreso.fecha_ingreso,
    fecha_salida : ingreso.fecha_salida,
    placa : ingreso.placa,
    aplicaDescuento : ingreso.aplicaDescuento,
    valor_tarifa : ingreso.valor_tarifa,
    valor_tiempo : ingreso.valor_tiempo,
    numero_factura: ingreso.numero_factura


  };
 console.log(JSON.stringify(data),);
  return this.http.post<any>(url,JSON.stringify(data), {headers: _headers});
  
}
}
