import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Router
import { RouterModule, Routes } from '@angular/router'
// forms
import { FormsModule } from '@angular/forms';
// httpClient
import { HttpClientModule } from '@angular/common/http';
// Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //toastr lo necesita
import { ToastrModule } from 'ngx-toastr';
//Guards
import { LoginGuard } from './guards/login.guard';
import { NoLoginGuard } from './guards/no-login.guard';
// Components
import { AppComponent } from './app.component';
import { ListaNegociosComponent } from './components/negocios/lista-negocios/lista-negocios.component';
import { NuevoNegocioComponent } from './components/negocios/nuevo-negocio/nuevo-negocio.component';
import { GirosNegocioComponent } from './components/negocios/giros-negocio/giros-negocio.component';
import { ListaPrestamosComponent } from './components/prestamos/lista-prestamos/lista-prestamos.component';
import { NuevoPrestamoComponent } from './components/prestamos/nuevo-prestamo/nuevo-prestamo.component';
import { AprobarPrestamosComponent } from './components/prestamos/aprobar-prestamos/aprobar-prestamos.component';
import { TipoCreditosComponent } from './components/prestamos/tipo-creditos/tipo-creditos.component';
import { ListaCobrosComponent } from './components/cobros/lista-cobros/lista-cobros.component';
import { CobrosDiaComponent } from './components/cobros/cobros-dia/cobros-dia.component';
import { PagosAtrasadosComponent } from './components/cobros/pagos-atrasados/pagos-atrasados.component';
import { ListaSucursalesComponent } from './components/sucursales/lista-sucursales/lista-sucursales.component';
import { NuevaSucursalComponent } from './components/sucursales/nueva-sucursal/nueva-sucursal.component';
import { ListaEmpleadosComponent } from './components/empleados/lista-empleados/lista-empleados.component';
import { NuevoEmpleadoComponent } from './components/empleados/nuevo-empleado/nuevo-empleado.component';
import { NuevoClienteComponent } from './components/clientes/nuevo-cliente/nuevo-cliente.component';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes.component';
import { ListaEmpresasComponent } from './components/empresas/lista-empresas/lista-empresas.component';
import { NuevaEmpresaComponent } from './components/empresas/nueva-empresa/nueva-empresa.component';
import { EncuestasRealizadasComponent } from './components/encuestas/encuestas-realizadas/encuestas-realizadas.component';
import { EncuestasPendientesComponent } from './components/encuestas/encuestas-pendientes/encuestas-pendientes.component';
import { LoginComponent } from './components/login/login.component';
import { SucursalEmpresasComponent } from './components/sucursales/sucursal-empresas/sucursal-empresas.component';
import { NuevaRutaComponent } from './components/rutas/nueva-ruta/nueva-ruta.component';
import { ListaRutasComponent } from './components/rutas/lista-rutas/lista-rutas.component';
import { RutaCobradorComponent } from './components/rutas/ruta-cobrador/ruta-cobrador.component';
import { HomeComponent } from './components/home/home.component';

// Routes:
const routes:Routes=[  
  {path:'home',component:HomeComponent, canActivate:[LoginGuard]},
  {path:'login',component:LoginComponent,canActivate:[NoLoginGuard]},
  {path:'lista-sucursales',component:ListaSucursalesComponent, canActivate:[LoginGuard]},
  {path:'nueva-sucursal',component:NuevaSucursalComponent, canActivate:[LoginGuard]},
  {path:'lista-empleados',component:ListaEmpleadosComponent, canActivate:[LoginGuard]},
  {path:'nuevo-empleado',component:NuevoEmpleadoComponent, canActivate:[LoginGuard]},
  {path:'lista-clientes',component:ListaClientesComponent, canActivate:[LoginGuard]},
  {path:'nuevo-cliente',component:NuevoClienteComponent, canActivate:[LoginGuard]},
  {path:'encuestas-realizadas',component:EncuestasRealizadasComponent, canActivate:[LoginGuard]},
  {path:'encuestas-pendientes',component:EncuestasPendientesComponent, canActivate:[LoginGuard]},
  {path:'lista-negocios',component:ListaNegociosComponent, canActivate:[LoginGuard]},
  {path:'nuevo-negocio',component:NuevoNegocioComponent, canActivate:[LoginGuard]},
  {path:'giros-negocio',component:GirosNegocioComponent, canActivate:[LoginGuard]},
  {path:'lista-prestamos',component:ListaPrestamosComponent, canActivate:[LoginGuard]},
  {path:'aprobar-prestamos',component:AprobarPrestamosComponent, canActivate:[LoginGuard]},
  {path:'nuevo-prestamo',component:NuevoPrestamoComponent, canActivate:[LoginGuard]},
  {path:'tipos-credito',component:TipoCreditosComponent, canActivate:[LoginGuard]},
  {path:'lista-cobros',component:ListaCobrosComponent, canActivate:[LoginGuard]},
  {path:'cobros-dia',component:CobrosDiaComponent, canActivate:[LoginGuard]},
  {path:'pagos-atrasados',component:PagosAtrasadosComponent, canActivate:[LoginGuard]},
  {path:'lista-empresas',component:ListaEmpresasComponent, canActivate:[LoginGuard]},
  {path:'nueva-empresa',component:NuevaEmpresaComponent, canActivate:[LoginGuard]},
  {path:'lista-rutas', component:ListaRutasComponent,canActivate:[LoginGuard]},
  {path:'nueva-ruta', component:NuevaRutaComponent, canActivate:[LoginGuard]},
  {path:'ruta-cobrador', component:RutaCobradorComponent, canActivate:[LoginGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    ListaNegociosComponent,
    NuevoNegocioComponent,
    GirosNegocioComponent,
    ListaPrestamosComponent,
    NuevoPrestamoComponent,
    AprobarPrestamosComponent,
    TipoCreditosComponent,
    ListaCobrosComponent,
    CobrosDiaComponent,
    PagosAtrasadosComponent,
    ListaSucursalesComponent,
    NuevaSucursalComponent,
    ListaEmpleadosComponent,
    NuevoEmpleadoComponent,
    NuevoClienteComponent,
    ListaClientesComponent,
    ListaEmpresasComponent,
    NuevaEmpresaComponent,
    ListaCobrosComponent,
    EncuestasRealizadasComponent,
    EncuestasPendientesComponent,
    LoginComponent,
    SucursalEmpresasComponent,
    NuevaRutaComponent,
    ListaRutasComponent,
    RutaCobradorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
