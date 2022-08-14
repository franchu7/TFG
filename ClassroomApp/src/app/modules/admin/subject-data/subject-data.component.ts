import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectFromDB } from 'src/app/core/models/subject.model';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-subject-data',
  templateUrl: './subject-data.component.html',
  styleUrls: ['./subject-data.component.scss']
})

/**
 * Mostrar la información de la asignatura
 */
export class SubjectDataComponent implements OnInit {

  // ID de la asignatura
  public id!: number;
  
  // Datos de la asignatura
  @Input() subject: SubjectFromDB = {
    id: 0,
    name: '',
    description: '',
    avatar: '',
  }

  constructor(private route: ActivatedRoute,
    private subjectService: SubjectService) {

    this.id = +this.route.snapshot.params['id']; 
    this.getSubject();

  }

  ngOnInit(): void {
  }


  // Método para obtener los datos de la asignatura
  public getSubject() {  
    this.subjectService.getSubject(this.id).subscribe((res) => {
      this.subject = res.data[0];
    })
  }


}



