import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tests-list-operator',
  templateUrl: './tests-list-operator.component.html',
  styleUrls: ['./tests-list-operator.component.css']
})
export class TestListOperatorComponent implements OnInit {

  public tests: Array<any> = [];
  public testsUser;
  public preloader: boolean = true;
  user: User;
  companie: string;

  constructor(private _testService: TestService, private _router: Router) {
    
    this.user = JSON.parse(localStorage.getItem('user'));
    this._testService.getTestsEmployee(this.user.uid).subscribe((item)=>{
      this.companie = item.payload.data()['companie']
      this.testsUser = item.payload.data()['tests']
      this._testService.getTests(this.companie).subscribe((item)=>{
        this.tests = item
        this.preloader = false;
      })
    })
    
    
  }

  ngOnInit(): void {
    
  }

}
