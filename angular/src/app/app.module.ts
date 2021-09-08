import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { EvolucionComponent } from './components/evolucion/evolucion.component';
import { CondensacionVentasComponent } from './components/condensacion-ventas/condensacion-ventas.component';
import { ConsolidadoComponent } from './components/consolidado/consolidado.component';


import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgApexchartsModule } from "ng-apexcharts";
import { NzDropDownModule } from "ng-zorro-antd/dropdown"
import { NzRadioModule } from 'ng-zorro-antd/radio';
import {NzCardModule} from 'ng-zorro-antd/card'
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    EvolucionComponent,
    CondensacionVentasComponent,
    ConsolidadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    ReactiveFormsModule,

    // Import Modules NG-ZORRO
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzDropDownModule,
    NzRadioModule,
    NzCardModule,
    NzAvatarModule,
    NzButtonModule,
    NzSpaceModule,
    //NzTableModule,

    // Import Modules NG-APEXCHARTS
    NgApexchartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
