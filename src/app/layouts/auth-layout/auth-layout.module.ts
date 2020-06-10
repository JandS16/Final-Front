import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Rutas
import { AuthLayoutRoutes } from './auth-layout.routing';

//Componentes
import { LoginComponent } from '../../pages/login/login.component';
import { SignupComponent } from '../../pages/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ]
})
export class AuthLayoutModule { }
