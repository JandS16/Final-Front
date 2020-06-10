import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from "../../components/avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { CrudService } from '../../services/lista.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';import { User } from 'src/app/services/user';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core';

import { EventEmitter } from 'protractor';
import { analytics } from 'firebase';
import { controllers } from 'chart.js';


@NgModule({
  imports: [BrowserModule, CommonModule]
})


@Component({
  selector: 'app-new-operator',
  templateUrl: './new-operator.component.html',
  styleUrls: ['./new-operator.component.scss']
})
export class NewOperatorComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: any = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  selected: string;

  validation_messages = {
   'name': [
     { type: 'required', message: 'Por favor ingrese el nombre' }
   ],
   'email': [
     { type: 'required', message: 'Por favor ingrese el correo' }
   ],
   'password': [
     { type: 'required', message: 'Por favor ingrese una contraseña' },
   ],
   'address': [
    { type: 'required', message: 'Por favor ingrese una dirección' },
  ],
  
   'id': [
    { type: 'required', message: 'Por favor ingrese el número de documento' },
  ]
 };

  file: any;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public crudService: CrudService,
    public authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    let user: User = JSON.parse(localStorage.getItem('user'));
    console.log(user.uid);
    this.createForm();
  }

  onSelectFile(event) {
    this.file = event.target.files[0]
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      id: ['', Validators.required ],
      tipoDocumento: this.selected,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }

  resetFields(){
    this.avatarLink = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
    this.file = undefined;
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      id: ['', Validators.required ],
      tipoDocumento: this.selected,
    });
  }

  onSubmit(value){
    let user: User = JSON.parse(localStorage.getItem('user'));
    let companyName=user.uid;
    console.log(value.email)
    this.authService.SignUpEmployee(value.name,value.email,value.password,value.tipoDocumento,value.id,companyName).then(
      (uid) => {
        if (uid !== null) {
          if (this.file!== undefined) {
            this.storageService.uploadFile(value.email, this.file)
          }
          this.crudService.createUser(value, uid, this.avatarLink)
          .then(
            res => {
              this.resetFields();
              this.router.navigate(['/operators-list']);
            }
          )
        }
      }
    )
  }
   
  getSelected(UserName: string, Direccion: string, idType: string, UserId: number, UserEmail: string, UserPassword: string){
    const value = {UserName, Direccion, idType, UserId, UserEmail, UserPassword};
    console.log("Este es el correo", value.UserEmail);
    let user: User = JSON.parse(localStorage.getItem('user'));
    let companyName=user.uid;
    this.authService.SignUpEmployee(UserName, UserEmail ,UserPassword,idType, UserId ,companyName).then(
      (uid) => {
        if (uid !== null) {
          if (this.file!== undefined) {
            this.storageService.uploadFile(Direccion, this.file)
          }
          this.crudService.createUser(value, uid, this.avatarLink)
          .then(
            res => {
              this.resetFields();
              this.router.navigate(['/operators-list']);
            }
          )
        }
      }
    )
  }

}