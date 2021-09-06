import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondensacionVentasComponent } from './components/condensacion-ventas/condensacion-ventas.component';
import { ConsolidadoComponent } from './components/consolidado/consolidado.component';
import { EvolucionComponent } from './components/evolucion/evolucion.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'evolucion', component:EvolucionComponent},
  { path: 'consolidado', component:ConsolidadoComponent},
  { path: 'condensacionVentas', component: CondensacionVentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
