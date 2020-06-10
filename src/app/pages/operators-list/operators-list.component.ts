import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../services/lista.service';
import { Router, Params } from '@angular/router';
import { User } from 'src/app/services/user';

import { ProfileComponent } from "../../components/profile/profile.component";

@Component({
  selector: 'app-operators-list',
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.scss']
})
export class OperatorsListComponent implements OnInit {
  
  searchValue: string = "";
  user:any;
  items: Array<any>=[];
  companie:any;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  
  constructor( public crudService: CrudService,
    private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.crudService.getUsers(this.user.uid)
    .subscribe(result => {
      this.items = result;
      console.log(this.items);
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
   /*  this.crudService.getCompanie(this.user.uid).subscribe(result=>{
      console.log(result.payload.data().companie);
      this.companie= result.payload.data().companie;

    }); */
    
  }

  

  viewDetails(item){
    this.crudService.setItem(item);
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.crudService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }

  setAvailability(item){
    this.crudService.available(item.payload.doc.id,item.payload.doc.data().available);
  }

  rangeChange(event){
    this.crudService.searchUsersByAge(event.value)
    .subscribe(result =>{
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}

