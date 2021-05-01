import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { AuthUserService } from '../services/auth-user.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendarOptions: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;


  constructor(private AuthUserServ: AuthUserService) { }

  ngOnInit(): void {
    const localstorage = window.localStorage;
    if (localstorage.getItem('uid')) {
      const uid = localstorage.getItem('uid');
      this.AuthUserServ.getAllCitas(uid).subscribe((Citas) => {
        console.log(Citas);
      });
    }
    this.calendarOptions = {
      events: [
        { title: 'event 1', date: '2021-05-01', },
        { title: 'event 2', date: '2021-05-02' }
      ]
    };
  }

  scrollTo( $event: string ) {
    document.getElementById( `${$event}` ).scrollIntoView();
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

}
