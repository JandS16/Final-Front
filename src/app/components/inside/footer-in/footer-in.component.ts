import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-in',
  templateUrl: './footer-in.component.html',
  styleUrls: ['./footer-in.component.css']
})
export class FooterInComponent implements OnInit {

  test: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
