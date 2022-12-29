import { AppReportesComponent } from './components/parqueadero/app-parqueadero/app-reportes/app-reportes.component';
import { AppSalidaComponent } from './components/parqueadero/app-parqueadero/app-salida/app-salida.component';
import { AppRegistroComponent } from './components/parqueadero/app-parqueadero/app-registro/app-registro.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppParqueaderoComponent } from './components/parqueadero/app-parqueadero/app-parqueadero.component';

const routes: Routes = [
  {path:'app-parqueadero',component:AppParqueaderoComponent},
  {path:'app-registro',component:AppRegistroComponent},
  {path:'app-salida',component:AppSalidaComponent},
  {path:'app-reportes',component:AppReportesComponent},
   {path:'*', pathMatch:'full',redirectTo:'app-parqueadero'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
