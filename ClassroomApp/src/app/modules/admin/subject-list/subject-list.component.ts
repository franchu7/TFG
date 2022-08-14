import { Component, OnInit } from '@angular/core';
import { SubjectFromDB } from 'src/app/core/models/subject.model';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})

/**
 * Lista de asignaturas disponibles en la clase
 */
export class SubjectListComponent implements OnInit {

  // Asignaturas guardadas
  public subjects:SubjectFromDB[];

  constructor(
    private subjectService: SubjectService) 
  {
    this.subjects = [];
  }

  ngOnInit(): void {
    this.getSubjects();
  }

  // Método para obtener las asignaturas y guardar sus datos
  public getSubjects() {
    this.subjectService.getSubjects().subscribe((res) => {
      this.subjects = res.data; 
      
    })
  }

}
