import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

/**
 * Componente para generar los avisos de confirmación
 */
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  // Cerrar el diálogo si no se confirma
  closeDialog(): void {
    this.dialog.close(false);
  }

  // Cerrar el diálogo si se confirma
  confirmed(): void {
    this.dialog.close(true);
  }

}
