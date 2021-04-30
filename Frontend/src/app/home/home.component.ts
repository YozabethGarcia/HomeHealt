import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../services/auth-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarOptions } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  especialidades: any = [
    {
       doctors : [],
       name: 'Medicina General',
    },
    {
       doctors: [],
       name: 'Dermatologia',
    },
    {
       doctors: [],
       name: 'Optometria',
    },
    {
       doctors : [],
       name: 'Neurocirugia',
    },
    {
       doctors : [],
       name: 'Psiquiatria',
    },
    {
       doctors: [],
       name: 'Radiologia',
    },
  ];
  currentDoctor: any = {};

  Cita: FormGroup;
  currDate: string;

  localStorage = window.localStorage;
  IdCliente: string;
  IdDoctor: string;

  constructor( private authService: AuthUserService,
               private modal: NgbModal,
               private dp: DatePipe,
               private fb: FormBuilder ) {
              this.CitaConstr();
  }

  ngOnInit(): void {
    this.authService.getAllUser().then( response => {
      response.doctors.forEach( medic => {
        this.especialidades.forEach( ( especialidad, index ) => {
          if ( especialidad.name === medic.especialidad ) {
            this.especialidades[index].doctors.push( medic );
          }
        });
      });
      //localStorage = window.localStorage;
      //console.log(this.authService.idClient());
    });

    this.currDate = this.dp.transform( new Date(), 'dd/MM/yyyy' );
  }

  async showMore( modal , id: string) {
    await this.especialidades.forEach( doctors => {
      doctors.doctors.forEach( doctor => {
        if( doctor.id === id ) {
          this.currentDoctor = doctor; 
        }
      });
    });
    console.log( this.currentDoctor );
    this.modal.open( modal );
  }

  async appointment( modal , id: string) {
    /*await this.especialidades.forEach( doctors => {
      doctors.doctors.forEach( doctor => {
        if ( doctor.id === id ) {
          this.currentDoctor = doctor;
        }
      });
    });
    console.log( this.currentDoctor );*/
    this.modal.open( modal );
    this.IdDoctor = id;
  }

  scrollTo( $event: String ) {
    document.getElementById( `${$event}` ).scrollIntoView();
  }

  CitaConstr(){
    this.Cita = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  AgendarCita(){
    console.log(this.Cita.value);
    console.log(this.IdDoctor);
    if (this.Cita.valid){
       this.authService.AgregarCita( this.IdDoctor,
                                     this.IdCliente,
                                     this.Cita.get('fecha').value,
                                     this.Cita.get('hora').value );
    }
  }

}
