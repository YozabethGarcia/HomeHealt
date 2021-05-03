import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CalendarOptions, EventApi, FullCalendarComponent } from '@fullcalendar/angular';
import { AuthUserService } from '../services/auth-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  citas: any = [];
  calendarOptions: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('detailsAploiment') details: TemplateRef<ElementRef>;
  currentAploiment: any = {};
  Cita: FormGroup;
  currentDoctor: any = {};

  constructor( private AuthUserServ: AuthUserService,
               private modal: NgbModal,
               private fb: FormBuilder) {
                this.CitaConstr();
               }

  ngOnInit(): void {
    if ( localStorage.getItem('uid') ) {
      const uid = localStorage.getItem('uid');
      this.AuthUserServ.getAllCitas( uid ).subscribe( ( citas ) => {
        this.citas = citas;
        console.log( this.citas );
        let eventArray: any = [];
        this.citas.forEach( cita => {
          eventArray.push(  { title: cita.titulo, date: cita.fecha, publicId: cita.uidCita } );
        });

        this.calendarOptions = { 
          events: eventArray,
          eventClick: ( $event ) => { this.handleDateClick( $event.event._def.extendedProps.publicId ) }
        };
      });
    }
  }

  get titulo() { return this.Cita.get('titulo'); }
  get fecha() { return this.Cita.get('fecha'); }
  get hora() { return this.Cita.get('hora'); }
  get descripcion() { return this.Cita.get('descripcion'); }

  scrollTo( $event: string ) {
    document.getElementById( `${$event}` ).scrollIntoView();
  }

  handleDateClick( uidCita: string) {
    for ( let i=0; i<this.citas.length; i++ ) {
      if ( this.citas[ i ].uidCita === uidCita ) {
        Object.assign( this.currentAploiment, this.citas[i] );        
        break;
      }
    }

    this.AuthUserServ.getDoctor( this.currentAploiment.uidDoctor ).then( ( doctor ) => {
      Object.assign( this.currentDoctor, doctor.doctor );
      this.titulo.setValue( this.currentAploiment.titulo );
      this.fecha.setValue( this.currentAploiment.fecha );
      this.hora.setValue( this.currentAploiment.hora );
      console.log( this.currentAploiment );
      this.descripcion.setValue( this.currentAploiment.descripcion );
      this.Cita.get('modo').setValue( this.currentAploiment.modo );
      this.modal.open( this.details );
    });
  }

  actualizarCita( uid ) {
    Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
    });
    Swal.showLoading();
    if ( this.Cita.valid ) {
      this.AuthUserServ.updateAploiment( uid , this.Cita.value ).then( ( res ) =>  {
        Swal.hideLoading();
        Swal.update({
          allowOutsideClick: true,
          icon: 'success',
          text: 'Cita actualizada',
          showConfirmButton: true,
        });
        this.closeModal();
      });
    }
  }

  CitaConstr() {
    this.Cita = this.fb.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', Validators.required],
      modo: ['local', Validators.required]
    });
  }

  eliminarCita( uid ) {
    Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.AuthUserServ.deleteAploiment( uid ).then( ( res ) => {
      Swal.hideLoading();
      Swal.update({
        allowOutsideClick: true,
        icon: 'success',
        text: 'Cita eliminada',
        showConfirmButton: true,
      });
      this.closeModal();
    });
  }

  closeModal() {
    this.modal.dismissAll();
  }

}
