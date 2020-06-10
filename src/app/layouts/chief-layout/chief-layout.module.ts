import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Rutas
import { ChiefLayoutRoutes } from './chief-layout.routing';

//Componentes
import { OperatorsListComponent } from '../../pages/operators-list/operators-list.component';

@NgModule({
  declarations: [
    OperatorsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ChiefLayoutRoutes),
    FormsModule
  ]
})

export class ChiefLayoutModule { }
