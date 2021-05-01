import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  localStorage = window.localStorage;

  constructor( private firestore: AngularFirestore,
               private fireAuth: AngularFireAuth, ) { 
    this.idClient();
  }

  signUp( email: string , password: string ): Promise <any> {
    return new Promise ( ( resolve, reject ) => {
      this.fireAuth.createUserWithEmailAndPassword( email , password ).then( add => {
        add.user.getIdToken().then( token => {
          const user = [{
            uid: add.user.uid,
            email: add.user.email,
            token: token,
          }];
          localStorage.clear();
          localStorage.setItem('token', JSON.stringify(user));
         });

         if ( localStorage.getItem('token') ) {
          const uid = JSON.parse( localStorage.getItem('token') )[0].uid;
         }
        
        resolve( { uid: add.user.uid });
      }).catch( ( error ) => {
        reject( { error: error } );
      });
    });
  }

  saveUser( user, id, picUrl ): Promise <any> {
    return new Promise( (resolve, rejects) => {
      user['contacto'] = [{
        facebook: user.facebook,
        whatsapp: user.whatsapp,
        instagram: user.instagram,
      }];
      
      user['urlFoto'] = picUrl;
  
      delete user['facebook'];
      delete user['whatsapp'];
      delete user['instagram'];
      delete user['1password'];
      this.firestore.collection('medicos').doc( id ).set(user);
      resolve( 'Guardado' );
    });
  }

  saveUserClient( id , user, image ): Promise <any> {
    return new Promise( (resolve, rejects) => {
      user.image = image;
      this.firestore.collection('cliente').doc( id ).set(user);
      resolve( 'Guardado' );
    });
  }

  getAllUser(): Promise <any> {
    return new Promise( ( resolve, rejects ) => {
      this.firestore.collection('medicos').get().subscribe( ( doctors ) => {
        const doctorsList = [];
        doctors.forEach( doc => {
          const data: any = doc.data();
          doctorsList.push({
            id: doc.id,
            nombre: data.nombre,
            pais: data.pais,
            departamento: data.departamento,
            ciudad: data.ciudad,
            urlFoto: data.urlFoto,
            bibliografia: data.bibliografia,
            especialidad: data.especialidad,
            titulo: data.titulo,
            direccion: data.direccion,
            lugaresAtencion: data.lugaresAtencion,
            contacto: [{
              facebook: data?.contacto[0]?.facebook, 
              twitter: data?.contacto[0]?.twitter, 
              whatsapp: data?.contacto[0]?.whatsapp,
            }]
          });
        });
        resolve(  {doctors: doctorsList } );
      });
    });
  }

  AgregarCita( idDoctor: string, idCliente: string, fecha: Date , hora: Time): Promise <any> {
    return new Promise( (resolve, rejects) => {
    const data = {
      IdDoctor: idDoctor,
      IdCliente : idCliente,
      Fecha: fecha,
      Hora: hora
    };
    //this.firestore.collection('Cita').add(data);
    resolve( 'Guardado' );
    });
  }

  idClient(): Promise <any> {
    return new Promise( (resolve, rejects) => {
      localStorage = window.localStorage;
      if (localStorage.getItem('token'))
      {
        const uid = JSON.parse(localStorage.getItem('token'))[0].uid;
        resolve(uid);
      }
    });
  }
}


