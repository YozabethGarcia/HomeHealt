import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogInService } from '../services/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  localStorage = window.localStorage;
  image = localStorage.getItem('image');
  @Output() scroll = new EventEmitter;
  constructor( private loginService: LogInService,
               private router: Router) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.loginService.logout().then( (logout) => {
      this.router.navigate(['']);
    });
  }

  scrollTo( to: string ) {
    console.log( to );
    this.scroll.emit( to );
  }

}
