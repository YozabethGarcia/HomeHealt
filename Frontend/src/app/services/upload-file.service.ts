import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor( private storage: AngularFireStorage ) { }

  uploadFile(file: File, path: string): Promise<any> {
    return new Promise( (resolve, reject) => {
      const uidFolder =  this.storage.ref(path);
      uidFolder.put(file).then( ( ) => {
        uidFolder.getDownloadURL().subscribe( ( url ) => {
          resolve( { url: url } );
        }, error => {
          reject( { error: error } );
        });
      });
    });
  }  
}
