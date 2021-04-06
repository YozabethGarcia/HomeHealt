import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  urlrequest: string = 'https://hgloo-api-rest.herokuapp.com';

  constructor( private http: HttpClient ) { }

  getCountrys() {
    return this.http.get( this.urlrequest + '/location/country');
  }

  getProvinces( country: number ) {
    return this.http.get( this.urlrequest + '/location/province/' + country );
  }

  getCitys( country: number, province: number ) {
    return this.http.get( this.urlrequest + '/location/city/' + province );
  }
}
