import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
import { LogInService } from '../services/log-in.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Usuario: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private LogUserService: LogInService) {
    this.ConstUsuario();
   }

  ngOnInit(): void {
  }

  get CorreoNoValido(){
    return this.Usuario.get('correoCliente').invalid && this.Usuario.get('correoCliente').touched;
  }

  get PassNoValido(){
    return this.Usuario.get('passwordCliente').invalid && this.Usuario.get('passwordCliente').touched;
  }

  ConstUsuario(){
    this.Usuario = this.fb.group({
      correoCliente: ['sa.4@gmail.com', [Validators.required, Validators.pattern('[\\w\\.-]*[a-zA-Z0-9_]@[\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]')]],
      passwordCliente: ['1234567', [Validators.required, Validators.minLength(7)]],
    });

  }

  cancel() {
    this.router.navigate(['']);
  }

  InicioSesion(){
    console.log(this.Usuario);
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

      this.LogUserService.LogIn(this.Usuario.get('correoCliente').value, this.Usuario.get('passwordCliente').value)
      .subscribe(resp => {
        console.log(resp);
        Swal.close();
        this.router.navigate(['AdminUsuarios']);
      }, (err) => {
        console.log(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.message
        });
      });
    }
  }
}
