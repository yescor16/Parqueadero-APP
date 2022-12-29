import { ITarifa } from './../../../../interfaces/ITarifa';
import { IIngreso } from './../../../../interfaces/IIngreso';
import { IngresoService } from './../../../../services/Ingreso.service';
import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { ITipoVehiculo } from 'src/app/interfaces/ITipoVehiculo';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-registro',
  templateUrl: './app-registro.component.html',
  styleUrls: ['./app-registro.component.css']
})

export class AppRegistroComponent implements OnInit {

  public listaTpVehiculo:ITipoVehiculo[];
  public tarifa:ITarifa;

  public tipoVehiculo : ITipoVehiculo;
  public ingreso : IIngreso;

  constructor(private sRegistro: IngresoService, private route:Router,private cdRef:ChangeDetectorRef) { 
    this.listaTpVehiculo = [];
    this.tarifa = {
      'id':0,
      'valor_tarifa' : 0
    };
    this.tipoVehiculo = {
      'id':0,
      'tipo_vehiculo':''
    }
    this.ingreso = {
      'ID':0,
        'id_tipovehiculo' : 0,
        'id_propietario' : 0,
        'propietario' : '',
        'placa' : '',
        'email' : '',
        'telefono': '',
        'fecha_ingreso' : '',
        'fecha_salida' : '',
        'minutos_transcurridos' : 0,
        'aplicaDescuento' : false,
        'valor_tarifa' : 0,
        'valor_tiempo' : 0,
        'numero_factura':''
    }
  }

  ngOnInit() {
    
    this.obtenerListadoTiposVehiculos();
  }

  obtenerTarifaPorVehiculo(obtenerTarifas:number){
    this.sRegistro.obtenerTarifas(obtenerTarifas).subscribe(resultado => {
      this.tarifa = resultado[0];
      this.ingreso.valor_tarifa = this.tarifa.valor_tarifa;
  });
  }

  obtenerListadoTiposVehiculos(){
    this.sRegistro.obtenerTipoVehiculo().subscribe(resultado => {
      this.listaTpVehiculo = resultado;
  });
  }
  registrarIngreso(){
    if(this.tipoVehiculo.id == 3){
      this.ingreso.placa = '';
    }
    this.ingreso.fecha_ingreso =  formatDate( new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');  

    this.sRegistro.RegistrarIngreso(this.ingreso).subscribe(resultado => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se ha registrado el ingreso del vehiculo',
        showConfirmButton: false,
        timer: 1500
      })
      this.ngOnInit();
      this.route.navigate(['/app-registro'])
  });
  }

  ngAfterView()
  {
    this.cdRef.detectChanges();
  }
}
