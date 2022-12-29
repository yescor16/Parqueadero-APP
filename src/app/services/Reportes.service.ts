import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

constructor(private http: HttpClient) { }

//
ObtenerVehiculosParqueadosPorTiempos(fechaDesde:string,fechaHasta:string){
  let url = "/api/ReportesParqueadero/ReporteVehiculosConSalidaPorTiempo";
  let token = "Bearer [Aquí especifica tu token]";
  let _headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE').set('strict-origin-when-cross-origin', 'http://localhost:44367');
  let data = {
    fecha_ingreso : fechaDesde,
    fecha_salida : fechaHasta

  };
   
  return this.http.post<any>(url,JSON.stringify(data), {headers: _headers}); 
}
}
