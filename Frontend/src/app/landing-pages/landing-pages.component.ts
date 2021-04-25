import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
import { LogInService } from '../services/log-in.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.css']
})
export class LandingPagesComponent implements OnInit {
  Usuario: FormGroup = this.fb.group({
    correoCliente: ['jorgemarin@gmail.com', [Validators.required, Validators.pattern('[\\w\\.-]*[a-zA-Z0-9_]@[\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]')]],
    passwordCliente: ['asd.456', [Validators.required, Validators.minLength(7)]],
  });
  logginState: boolean = false;


  constructor( private router: Router,
               private fb: FormBuilder,
               private LogUserService: LogInService) {}

  ngOnInit(): void {
  }

  get CorreoNoValido(){
    return this.Usuario.get('correoCliente').invalid && this.Usuario.get('correoCliente').touched;
  }

  get PassNoValido(){
    return this.Usuario.get('passwordCliente').invalid && this.Usuario.get('passwordCliente').touched;
  }

  InicioSesion() {
    if (this.Usuario.invalid) {
      return Object.values(this.Usuario.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.LogUserService
      .LogIn(this.Usuario.get('correoCliente').value, this.Usuario.get('passwordCliente').value)
      .then( ( logged )  => { 
        Swal.close();
        this.router.navigate(['home']);
      }).catch( ( error ) => {
        console.log( error );
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: error
        });
      });
    }
  }

  changeLogginState() {
    this.logginState = !this.logginState; 
  }
}
