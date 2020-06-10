import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

//Layouts
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { OperatorLayoutComponent } from './layouts/operator-layout/operator-layout.component';
import { ChiefLayoutComponent } from './layouts/chief-layout/chief-layout.component'

//Services
import { AuthService } from './services/auth.service';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule  } from "./material/material.module";
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    OperatorLayoutComponent,
    ChiefLayoutComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
