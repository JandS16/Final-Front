import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from "../../components/avatar-dialog/avatar-dialog.component";
import { CrudService } from '../../services/lista.service';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-edit-operator',
  templateUrl: './edit-operator.component.html',
  styleUrls: ['./edit-operator.component.scss']
})
export class EditOperatorComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  selected = 'CC';
  id;
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

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = this.route.snapshot.paramMap.get('id');
      
      this.crudService.getUser(this.id)
      .subscribe(result => {

        this.item = this.crudService.getItem();
        console.log(this.item.payload.doc.data().email)
        this.exampleForm = this.fb.group({
          name: [this.item.payload.doc.data().name, Validators.required ],
          address: [this.item.payload.doc.data().address, Validators.required ],
          email: [this.item.payload.doc.data().email, Validators.required ],
          password: [this.item.payload.doc.data().password, Validators.required ],
          id: [this.item.payload.doc.data().numeroDocumento, Validators.required ],
          tipoDocumento: this.item.payload.doc.data().tipoDocumento})
        
      });
      this.createForm();
      
    })
  }

  createForm() {
    
    this.exampleForm = this.fb.group({
      name: ["", Validators.required ],
      address: ["", Validators.required ],
      email: ["", Validators.required ],
      
      password: ["", Validators.required ],
      id: ["", Validators.required ],
      tipoDocumento: this.selected,
    });
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.item.avatar = result.link;
      }
    });
  }

  onSubmit(value){
   /*  value.avatar = this.item.avatar;
    value.age = Number(value.age); */
    this.crudService.updateUser(this.id, value)
    .then(
      res => {
        this.router.navigate(['/operators-list']);
      }
    )
  }

  delete(){
    this.crudService.deleteUser(this.id)
    .then(
      res => {
        this.router.navigate(['/operators-list']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/operators-list']);
  }

}