import { IIngreso } from 'src/app/interfaces/IIngreso';
import { IVehiculosParqueados } from './../../../../interfaces/IVehiculosParqueados';
import { ITipoVehiculo } from 'src/app/interfaces/ITipoVehiculo';
import { IngresoService } from './../../../../services/Ingreso.service';
import { SalidaService } from './../../../../services/Salida.service';
import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-salida',
  templateUrl: './app-salida.component.html',
  styleUrls: ['./app-salida.component.css']
})
export class AppSalidaComponent {

  public salidaVehiculo:IIngreso;
  public listaVehiculos:IVehiculosParqueados[];
  public vehiculo:string;
  public listaTpVehiculo:ITipoVehiculo[];
  public responseVehiculo :string;

 
  public dataSource:any;
  columnas: string[] = ['vehiculo', 'placa', 'propietario','valor_tarifa','fecha_ingreso'
  ,'descuento','salida'];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private sSalida: SalidaService, private sRegistro:IngresoService, private route:Router,
    private cdRef:ChangeDetectorRef) {
    this.salidaVehiculo = {
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
    this.listaVehiculos = [];
    this.listaTpVehiculo = [];
    this.vehiculo = "";
 
    this.responseVehiculo = "";
   }

  ngOnInit() {
    this.ObtenerVehiculosParqueados();
  
    
  }


  ObtenerVehiculosParqueados(){
    this.sSalida.ObtenerVehiculosParqueados().subscribe(resultado => {
      this.listaVehiculos = resultado;
      
      for(let i = 0; i< this.listaVehiculos.length;i++){
        this.obtenerVehiculo(this.listaVehiculos[i].id_tipovehiculo,i);
      }
      this.dataSource = new MatTableDataSource<IVehiculosParqueados>(this.listaVehiculos);
      this.dataSource.paginator = this.paginator;
  });
  }


  obtenerVehiculo(idTipoVehiculo:number, posicion:number){
    this.sRegistro.obtenerTipoVehiculo().subscribe(resultado => {
      this.listaTpVehiculo = resultado;
      for (let i = 0; i < this.listaTpVehiculo.length; i++) {
        if(this.listaTpVehiculo[i].id == idTipoVehiculo){
          this.escribirTipoVehiculo(this.listaTpVehiculo[i].tipo_vehiculo, posicion);
        }
      }
  });
  }

  escribirTipoVehiculo(tipoVehiculo:string, cont:number){
    this.listaVehiculos[cont].vehiculo = tipoVehiculo;
  }

  pasarDatos(element: any){
    for(let i = 0; i < this.listaVehiculos.length; i++){
      if(this.listaVehiculos[i].ID == element.id){
        this.salidaVehiculo = this.listaVehiculos[i];
      }
    }
    this.salidaVehiculo = element;
    this.salidaVehiculo.ID = element.id;
    this.salidaVehiculo.aplicaDescuento = element.aplicaDescuento;
    this.salidaVehiculo.fecha_salida =  formatDate( new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US'); 
    this.sSalida.ObtenerValorTarifaPorId(this.salidaVehiculo).subscribe(resultado => {
    this.salidaVehiculo = resultado;
    this.salidaVehiculo.ID = resultado.id;
  });
  
  }

  resgistrarSalida(){
  this.sSalida.registrarSalidaVehiculo(this.salidaVehiculo).subscribe(resultado => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha registrado la salida del vehiculo',
      showConfirmButton: false,
      timer: 1500
    })
   this.ngOnInit();

  });
}

  ngAfterViewChecked()
{
  this.cdRef.detectChanges();
}
}
