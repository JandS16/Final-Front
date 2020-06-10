import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/lista.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-operators-list',
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.css']
})
export class OperatorsListComponent implements OnInit {

  searchValue: string = "";
  user:any;
  items: Array<any>=[];
  avatars: String[] = [];
  companie:any;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  public preloader: boolean = true;
  
  constructor( public crudService: CrudService,
    public storageService: StorageService,
    private router: Router) {
      this.getData();
    }

  ngOnInit(): void {
    console.log(this.avatars[0]);
  }
  getData(){
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.crudService.getUsers(this.user.uid)
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
      this.preloader = false;
    })
    
  }

  

  viewDetails(item){
    this.crudService.setItem(item);
    this.router.navigate(['edit-operator', item.payload.doc.id]);
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
