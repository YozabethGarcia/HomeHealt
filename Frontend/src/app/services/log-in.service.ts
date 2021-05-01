import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  userToken: string;

  constructor(private firestore: AngularFirestore,
              private fireAuth: AngularFireAuth,
              private http: HttpClient) {

  }

  LogIn( email: string , password: string ): Promise<any> {
    return new Promise( (resolve, reject) => {

      this.fireAuth.signInWithEmailAndPassword( email, password ).then( ( user ) => {
        user.user.getIdToken().then( ( token ) => {
          const uid = user.user.uid;
          localStorage.setItem('uid', uid);
          this.firestore.collection('cliente').doc( user.user.uid ).get().subscribe(( user: any ) => {
            const localStorage = window.localStorage;
            const image =  user.data().image;
            localStorage.setItem('image', image);
          });
          this.guardarToken( token );
          resolve( user );
        })
      });
    });
  }



  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }
  }

  async logout(): Promise<any> {
    await localStorage.clear();
    return this.fireAuth.signOut();
  }

  AgregarCita( idDoctor: string, idCliente: string, fecha: Date , hora: Time){

    const data = {
      IdDoctor: idDoctor,
      IdCliente : idCliente,
      Fecha: fecha,
      Hora: hora
    };

    this.firestore.collection('Cita').add(data);

  }
}
