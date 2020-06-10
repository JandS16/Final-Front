import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
