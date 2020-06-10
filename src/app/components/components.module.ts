import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './auth/navbar/navbar.component';
import { FooterComponent } from './auth/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterInComponent } from './inside/footer-in/footer-in.component';
import { NavbarInComponent } from './inside/navbar-in/navbar-in.component';
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    FooterInComponent,
    NavbarInComponent,
    AvatarDialogComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    NavbarInComponent,
    FooterInComponent
  ]
})
export class ComponentsModule { }