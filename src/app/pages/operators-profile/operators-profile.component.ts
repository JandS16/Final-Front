import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone} from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'firebase';
import { CrudService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-operators-profile',
  templateUrl: './operators-profile.component.html',
  styleUrls: ['./operators-profile.component.css']
})

@Injectable({
  providedIn: 'root'
})


export class OperatorsProfile implements OnInit {

  user: User;
  companie: string;
  id: string;
  name: string;
  idType: string;
  emailUser: string;
  phone: string;
  employees: number;

  constructor(private _profileService: ProfileService, private crudService: CrudService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this._profileService.getProfile(this.user.uid).subscribe((item)=>{
      this.companie = item.payload.data()['empresa']
      this.id = item.payload.data()['id']
      this.name = item.payload.data()['name']
      this.idType = item.payload.data()['tipo_id']
      this.emailUser = this.user.email
      this.phone = item.payload.data()['telefono']
    })
    this.crudService.getUsers(this.user.uid).subscribe((item)=>{
      this.employees = item.length
    })
  }

  ngOnInit(): void {
    
  }

}

