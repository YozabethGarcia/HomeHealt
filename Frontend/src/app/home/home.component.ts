import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../services/auth-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor( private authService: AuthUserService,
               private modal: NgbModal ) { }

  ngOnInit(): void {
    this.authService.getAllUser().then( response => {
      response.doctors.forEach( medic => {
        this.especialidades.forEach( ( especialidad, index ) => {
          if ( especialidad.name === medic.especialidad ) {
            this.especialidades[index].doctors.push( medic );
          }
        });
      });
    });
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
}
