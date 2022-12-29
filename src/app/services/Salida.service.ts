import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IIngreso } from '../interfaces/IIngreso';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

constructor(private http: HttpClient) {
  this.ObtenerVehiculosParqueados();
 }

ObtenerVehiculosParqueados(): Observable<any>{
  let url = "/api/RegistroParqueadero/ObtenerVehiculosParqueados";
  let token = "Bearer [Aquí especifica tu token]";
  let _headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE').set('strict-origin-when-cross-origin', 'http://localhost:44367');

  return this.http.get<any>(url, {headers: _headers});
}


ObtenerValorTarifaPorId(ingreso: IIngreso){
  let url = "/api/RegistroParqueadero/ObtenerValorTarifaPorId";
  let token = "Bearer [Aquí especifica tu token]";
  let _headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE').set('strict-origin-when-cross-origin', 'http://localhost:44367');
  let data = {
    ID:ingreso.ID,
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
  return this.http.post<any>(url,JSON.stringify(data), {headers: _headers});
  
}



registrarSalidaVehiculo(salida: IIngreso){
  let url = "/api/RegistroParqueadero/RegistroSalidaVehiculo";
  let token = "Bearer [Aquí especifica tu token]";
  let _headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE').set('strict-origin-when-cross-origin', 'http://localhost:44367');
  let data = {
    ID:salida.ID,
    id_tipovehiculo : salida.id_tipovehiculo,
    id_propietario : salida.id_propietario,
    propietario : salida.propietario,
    email : salida.email,
    telefono : salida.telefono,
    minutos_transcurridos : salida.minutos_transcurridos,
    fecha_ingreso : salida.fecha_ingreso,
    fecha_salida : salida.fecha_salida,
    placa : salida.placa,
    aplicaDescuento : salida.aplicaDescuento,
    valor_tarifa : salida.valor_tarifa,
    valor_tiempo : salida.valor_tiempo,
    numero_factura: salida.numero_factura
  };
  console.log(data);
  
  return this.http.post<any>(url,JSON.stringify(data), {headers: _headers});
  
}
}
