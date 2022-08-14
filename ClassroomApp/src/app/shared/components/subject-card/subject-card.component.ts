import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubjectFromDB } from 'src/app/core/models/subject.model';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss']
})

/**
 * Componente que representa a la asignatura registrada en la web
 */
export class SubjectCardComponent implements OnInit {

  // Datos de la asignatura
  @Input() subject: SubjectFromDB = {
    id: 0,
    name: '',
    description: '',
    avatar: '',
  }
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private subjectService: SubjectService) {   
    }

  ngOnInit(): void {

  }

  
  // Borrar la asignatura
  public deleteSubject(id: number) {
    this.subjectService.deleteSubject(id).subscribe((res) => {
      this.refresh();
    })
  }

  // Recargar la página 
  public refresh() {
    window.location.reload();
  }

  // Método para el diálogo de confirmación en el borrado de una asignatura
  public openDialog(id: number): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: `¿Está seguro/a de que quiere borrar la asignatura?`
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
          this.deleteSubject(id);
        }
      });
  }

  // Obtener la información de la asignatura mostrándola en otra página
  public getSubjectData(id: number) {
    this.router.navigateByUrl('/admin/subject/'+id);
  }

  // Actualizar la información de la asignatura mostrándo los datos de la asignatura en otra página
  public updateSubjectData(id: number) {
    this.router.navigateByUrl('/admin/subjectUpdate/'+id);
  }

}
