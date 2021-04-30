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
       name: 'Dermatología',
    },
    {
       doctors: [],
       name: 'Optometría',
    },
    {
       doctors : [],
       name: 'Neurocirugía',
    },
    {
       doctors : [],
       name: 'Psiquiatría',
    },
    {
       doctors: [],
       name: 'Radiología',
    },
  ];
  copyEspecialidades: any = this.especialidades;
  currentDoctor: any = {};
  searchDoctor: string = '';
  infoEspecialidades = [
    {
      codigo: 1,
      img: 'assets/img/Icon Especialidades/Slice 2.png',
      titulo: 'Dermatología',
      descripcion: 'Es una especialidad de la medicina que se ocupa del conocimiento y estudio de la piel humana y de las enfermedades que la afectan. Esta especialidad también se preocupa de la prevención de las enfermedades y de la preservación o la recuperación de la normalidad cutánea, así como de la dermocosmética que se dedica a la higiene, a la apariencia y protección de la piel.',
    },
    {
      codigo: 2,
      img: 'assets/img/Icon Especialidades/Slice 21.png',
      titulo: 'Optometría',
      descripcion: 'Es la medición de la agudeza de la visión con la intención de revertir eventuales defectos a través de lentes. Hace referencia a la disciplina que se encarga de cuidar la salud visual a nivel primario. Abarca diversas acciones para diagnosticar, prevenir, tratar y corregir daños o deficiencias de la vista.',
    },
    {
      codigo: 3,
      img: 'assets/img/Icon Especialidades/Slice 22.png',
      titulo: 'Neurocirugía',
      descripcion: 'Trata las intervenciones quirúrgicas de las enfermedades del sistema nervioso.',
    },
    {
      codigo: 4,
      img: 'assets/img/Icon Especialidades/Slice 23.png',
      titulo: 'Psiquiatría',
      descripcion: 'Especialidad médica que estudia las enfermedades mentales, sus tipos, causas, cursos y tratamientos.',
    },
    {
      codigo: 5,
      img: 'assets/img/Icon Especialidades/Slice 24.png',
      titulo: 'Cirugía General',
      descripcion: 'Comprende el diagnóstico y tratamiento de enfermedades que se resuelven por procedimientos quirúrgicos o potencialmente quirúrgicos tanto electivos como de urgencia, en los siguientes aparatos: digestivo, endocrino, mama, piel y partes blandas, pared abdominal y retroperitoneo.'
    },
    {
      codigo: 6,
      img: 'assets/img/Icon Especialidades/Slice 25.png',
      titulo: 'Oftalmología',
      descripcion: 'Especialidad médica que se encarga del tratamiento de las enfermedades de los ojos. Esta disciplina también tiene aplicación en la veterinaria ya que los seres humanos y los animales suelen compartir, en este caso, procesos patológicos similares.',
    },
    {
      codigo: 7,
      img: 'assets/img/Icon Especialidades/Slice 26.png',
      titulo: 'Medicina Alternativa',
      descripcion: 'Tratamientos que se usan en lugar de los tratamientos estándar. Los tratamientos estándar se basan sobre los resultados de la investigación científica y en la actualidad se aceptan y se usan ampliamente. La medicina alternativa incluye regímenes de alimentación especiales, mega dosis de vitaminas, preparados con hierbas, tés especiales y terapia con imanes.'
    },
    {
      codigo: 8,
      img: 'assets/img/Icon Especialidades/Slice 27.png',
      titulo: 'Virología',
      descripcion: 'Es la rama de la microbiología que estudia los virus y las enfermedades que generan.',
    },
    {
      codigo: 9,
      img: 'assets/img/Icon Especialidades/Slice 28.png',
      titulo: 'Hematología',
      descripcion: 'Ciencia o especialidad médica que estudia el estado y funcionamiento de las células sanguíneas y su interacción bioquímica con otros elementos.'
    },
    {
      codigo: 10,
      img: 'assets/img/Icon Especialidades/Slice 29.png',
      titulo: 'Bioquímica',
      descripcion: 'Es una ciencia que estudia a nivel molecular las características, estructura, organización y funciones los componentes químicos de los seres vivos. Combina conocimientos de diversas áreas como la Medicina, la Biología y la Química.'
    },
    {
      codigo: 11,
      img: 'assets/img/Icon Especialidades/Slice 210.png',
      titulo: 'Radiología',
      descripcion: 'Es el uso médico de la radiación para diagnosticar y tratar diversos problemas de salud. A partir de la utilización de rayos gamma, rayos X y otras clases de rayos, es posible obtener imágenes internas del organismo.'
    },
    {
      codigo: 12,
      img: 'assets/img/Icon Especialidades/Slice 211.png',
      titulo: 'Cirugía plástica',
      descripcion: 'Es una especialidad quirúrgica que se ocupa de la corrección de todo proceso congénito, adquirido, tumoral o simplemente involutivo, que requiera reparación o reposición, o que afecte a la forma y/o función corporal.'
    },
    {
      codigo: 13,
      img: 'assets/img/Icon Especialidades/Slice 212.png',
      titulo: 'Ortopedia',
      descripcion: 'Es la especialidad médica que corrige las enfermedades, malformaciones y trastornos degenerativos de los huesos, las articulaciones y el sistema músculo-esquelético.'
    },
    {
      codigo: 14,
      img: 'assets/img/Icon Especialidades/Slice 213.png',
      titulo: 'Obstetricia',
      descripcion: 'Es una especialidad de la medicina que se ocupa de la salud de la mujer durante el embarazo, el parto y el puerperio.'
    },
    {
      codigo: 15,
      img: 'assets/img/Icon Especialidades/Slice 214.png',
      titulo: 'Geriatría',
      descripcion: 'Es la rama médica dedicada al cuidado de los adultos mayores que toca aspectos preventivos, terapéuticos, rehabilitatorios y paliativos integrando los aspectos sociales y familiares.'
    },
    {
      codigo: 16,
      img: 'assets/img/Icon Especialidades/Slice 215.png',
      titulo: 'Pediatría',
      descripcion: 'Es la rama de la medicina que se especializa en la salud y las enfermedades de los niños. Se trata de una especialidad médica que se centra en los pacientes desde el momento del nacimiento hasta la adolescencia, sin que exista un límite preciso que determine el final de su validez.'
    },
];
  speciality = {};

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
      this.copyEspecialidades = this.especialidades;
      console.log( this.especialidades );
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
    this.modal.open( modal );
  }

  scrollTo( $event: String ) {
    document.getElementById( `${$event}` ).scrollIntoView();
  }

  filterBySpeciality( category ) {
    if ( category === 'all' ) {
      this.especialidades = this.copyEspecialidades;
      return;
    }

    var currentCategory = {};
    this.especialidades = this.copyEspecialidades;
    this.especialidades.forEach( element => {
      console.log( element.name.trim() === category.trim() );
      if ( element.name === category ) {
        currentCategory = element;
        console.log( currentCategory );
      }
    });
    this.copyEspecialidades = this.especialidades;
    this.especialidades = [];
    this.especialidades.push( currentCategory );

  }

  currentSpeciality( speciality, modalSpecialidades ) {
    Object.assign( this.speciality , speciality );
    this.modal.open( modalSpecialidades );
  }
}
