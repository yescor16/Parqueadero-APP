import { ReportesService } from './../../../../services/Reportes.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { NgbCalendar, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IVehiculosParqueados } from 'src/app/interfaces/IVehiculosParqueados';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef, Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-app-reportes',
  templateUrl: './app-reportes.component.html',
  styleUrls: ['./app-reportes.component.css'],
  standalone: true,
	imports: [NgbTimepickerModule, FormsModule, JsonPipe,NgbDatepickerModule,MatTableModule,MatPaginatorModule, DecimalPipe],
})


export class AppReportesComponent  {

	time = { hour: 13, minute: 30 };
  desde:any;
  hasta:any;
  public dataSource:any;
  columnas: string[] = ['vehiculo', 'placa', 'propietario','valor_tarifa','fecha_ingreso','fecha_salida'
  ,'descuento','valor_tiempo','minutos_transcurridos'];
  public listaVehiculos:IVehiculosParqueados[];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

	constructor(private sReportes: ReportesService,private calendar: NgbCalendar, private route:Router,
    private cdRef:ChangeDetectorRef) {
    this.listaVehiculos = [];
  }


  ngOnInit() {
    
  }
  ObtenerVehiculosParqueados(){
    let fechaHasta = this.hasta.year + "-" + this.hasta.month + "-" + this.hasta.day;
    let fechaDesde = this.desde.year + "-" + this.desde.month + "-" + this.desde.day;    
    this.sReportes.ObtenerVehiculosParqueadosPorTiempos(fechaDesde, fechaHasta).subscribe(resultado => {
      this.listaVehiculos = resultado; 
      this.dataSource = new MatTableDataSource<IVehiculosParqueados>(this.listaVehiculos);
      this.dataSource.paginator = this.paginator;
  });
  }
  
}
