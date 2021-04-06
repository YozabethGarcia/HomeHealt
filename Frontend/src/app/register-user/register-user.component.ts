import { Component, OnInit } from '@angular/core';
import { DomSanitizer , SafeStyle } from '@angular/platform-browser';
import { LocationsService } from '../services/locations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../services/auth-user.service';
import { UploadFileService } from '../services/upload-file.service';
import { ToastrService } from 'ngx-toastr';

interface Picture {
  name?: string;
  safeUrl?: SafeStyle;
  file?: File;
  result?: SafeStyle;
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  medicForm: boolean = false;
  clientForm: boolean = false;
  select: boolean = true;
  picture: Picture = { safeUrl: null };
  countrys: any = [];
  provinces: any = [];
  citys: any = [];
  titles = [];
  medicFormData: FormGroup = this.formBuilder.group({
    id: ['0871-5475-36547', Validators.required],
    nombre: ['Miguel Alvarez', Validators.required],
    pais: ['1', Validators.required],
    departamento: ['2', Validators.required],
    ciudad: ['3', Validators.required],
    bibliografia: ['asjkjassssssssssshkashkahabmasbms ashkhsjkhakjhsa kjsa hsajk ', Validators.required],
    especialidad: ['Medicina General', Validators.required],
    direccion: ['saaaakljwla awklaaaaaaaaaaaaaaaa waiwiaooa', Validators.required],
    lugaresAtencion: ['assssssssss wwwwwwwwwasdsaaaaaaa', Validators.required],
    facebook: [''],
    instagram: [''],
    whatsapp: [''],
    correo: ['miguela@gmail.com', Validators.required],
    password: ['asd.456', Validators.required],
    telefono: ['8968-6987', Validators.required],
  });

  clientFormData: FormGroup = this.formBuilder.group({
    idCliente: ['', Validators.required],
    nombreCliente: ['', Validators.required],
    correoCliente: ['', Validators.required],
    passwordCliente: ['', Validators.required ], 
  });

  constructor(  private sanitizer: DomSanitizer, 
                private location: LocationsService,
                private formBuilder: FormBuilder,
                private authService: AuthUserService,
                private uploadFile: UploadFileService,
                private toastr: ToastrService ) { }

  get id() { return this.medicFormData.get('id'); }
  get nombre() { return this.medicFormData.get('nombre'); }
  get pais() { return this.medicFormData.get('pais'); }
  get departamento() { return this.medicFormData.get('departamento'); }
  get ciudad() { return this.medicFormData.get('ciudad'); }
  get bibliografia() { return this.medicFormData.get('bibliografia'); }
  get especialidad() { return this.medicFormData.get('especialidad'); }
  get direccion() { return this.medicFormData.get('direccion'); }
  get lugaresAtencion() { return this.medicFormData.get('lugaresAtencion'); }
  get facebook() { return this.medicFormData.get('facebook'); }
  get instagram() { return this.medicFormData.get('instagram'); }
  get whatsapp() { return this.medicFormData.get('whatsapp'); }
  get correo() { return this.medicFormData.get('correo'); }
  get password() { return this.medicFormData.get('password'); }
  get telefono() { return this.medicFormData.get('telefono'); }


  get idCliente() { return this.clientFormData.get('idCliente'); }
  get nombreCliente() { return this.clientFormData.get('nombreCliente'); }
  get correoCliente() { return this.clientFormData.get('correoCliente'); }
  get passwordCliente() { return this.clientFormData.get('passwordCliente'); }

  ngOnInit(): void {
    this.location.getCountrys().subscribe( country => {
      this.countrys = country;
    });
  }

  clientBottom(){
    this.medicForm = false;
    this.select = false;
    this.clientForm = true;
  }

  medicBottom(){
    this.medicForm = true;
    this.clientForm = false;
    this.select = false;
  }

  selectPicture(event) {
    if ( event.target.files.length > 0 ) {
      this.picture.name = event.target.files[0].name;
      this.picture.file = event.target.files[0];

      if ( this.picture.file ) {
        const reader = new FileReader();
        reader.onload = ( e: any ) => {
          this.picture.result = e.target.result;
          this.picture.safeUrl = this.sanitizer.bypassSecurityTrustStyle(
            'url(' + this.picture.result + ')',
          );
        };
        reader.readAsDataURL( event.target.files[0] );
      }
      this.picture.result = this.picture.safeUrl;
    }
  }

  selectTitles(event) {
    if ( event.target.files.length > 0 ) {
      const name = event.target.files[0].name;
      const file = event.target.files[0];

      if ( file ) {
        const reader = new FileReader();
        reader.onload = ( e: any ) => {
          const result = e.target.result;
          this.titles.push({
            name: name,
            file: file,
            safeUrl: this.sanitizer.bypassSecurityTrustStyle('url(' + result + ')',),
          });
        };
        reader.readAsDataURL( event.target.files[0] );
      }
      this.picture.result = this.picture.safeUrl;
    }
  }

  getProvinces() {
    this.location.getProvinces( this.pais.value ).subscribe( provinces => {
      this.provinces = provinces;
    });
  }

  getCitys() {
    this.location.getCitys( this.pais.value, this.departamento.value ).subscribe( citys => {
      this.citys = citys;
    });
  }

  saveDoctor() {
    if ( this.medicFormData.valid ) {
      this.authService.signUp( this.correo.value , this.password.value ).then( res => {
        this.uploadFile.uploadFile( this.picture.file, this.id.value + '/' + this.picture.name ).then( async ( profile ) => {
          this.medicFormData['urlFoto'] = profile.url;
          const titlesMedic = [];
          await Promise.all(this.titles.map( async file => {
            await this.uploadFile.uploadFile( file.file, this.id.value + '/' + file.name).then( ( newTitle ) => {
              titlesMedic.push( newTitle.url );
            });
          }));
          this.medicFormData['titlesMedics'] = titlesMedic;
          this.addSocial();
          this.authService.saveUser( this.medicFormData.value ).then( saved => {
            console.log( 'Guardado' );
            this.toastr.success('Su informacion sera verificada para comenzar a operar!', 'Bienvenido a Home health');
          });
        });   
      });
    } else {
            console.log( 'Debe llenar algunos campos' );
    }
  }

  addSocial() {
    this.medicFormData['contacto'] = [{
      facebook: this.facebook.value,
      whatsapp: this.whatsapp.value,
      instagram: this.instagram.value,
    }];

    delete this.medicFormData['facebook'];
    delete this.medicFormData['whatsapp'];
    delete this.medicFormData['instagram'];
    delete this.medicFormData['1password'];
  }

  cancel() {
    this.medicForm = false;
    this.clientForm = false;
    this.select = true;
  }

  saveClient() {
    if ( this.clientFormData.valid ) {
      this.authService.signUp( this.correoCliente.value , this.passwordCliente.value ).then( res => {
        this.uploadFile.uploadFile( this.picture.file, this.idCliente.value + '/' + this.picture.name ).then( async ( profile ) => {
          this.clientFormData['urlFoto'] = profile.url;
          this.authService.saveUserClient( this.clientFormData.value ).then( saved => {
            console.log( 'Guardado' );
          });
        });   
      });
    } else {
      console.log( 'Formulario Invalido' );
    }
  }
}
