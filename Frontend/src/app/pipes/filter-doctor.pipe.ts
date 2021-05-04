import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDoctor'
})
export class FilterDoctorPipe implements PipeTransform {

  transform(value: any, name: string): any {
    if ( !value || name === "" ) {
      return value;
    }

    const resultDoctors = [];
    let found = [];
    value.forEach( doctors => {
      for(const doctor of doctors.doctors) {
        if(doctor.nombre.toLowerCase().indexOf(name.toLowerCase()) !== -1){
          found.push( doctor );
        }
      }
      resultDoctors.push( { doctors: found, name: doctors.name } );
      found = [];
    });

    return resultDoctors;
  }

}
