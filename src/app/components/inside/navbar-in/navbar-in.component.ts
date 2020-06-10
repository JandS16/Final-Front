import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-in',
  templateUrl: './navbar-in.component.html',
  styleUrls: ['./navbar-in.component.css']
})
export class NavbarInComponent implements OnInit {

	@Output() SignOutEmitter = new EventEmitter<any>();

	SignOut(){
    this.authService.SignOut();
    this.SignOutEmitter.emit();
	}

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}