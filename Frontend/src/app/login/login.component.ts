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
  }

  cancel() {
    this.router.navigate(['']);
  }

  
}
