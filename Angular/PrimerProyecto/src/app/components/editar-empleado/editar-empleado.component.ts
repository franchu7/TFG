import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  formularioDeEmpleados:FormGroup;
  id:any;

  constructor(
    private activeRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador:Router
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.crudService.ObtenerEmpleado(this.id).subscribe(respuesta=>{
      console.log(respuesta);
      this.formularioDeEmpleados.setValue({
        nombre:respuesta[0]['nombre'],
        correo:respuesta[0]['correo']
      })
    });

    this.formularioDeEmpleados=this.formulario.group({
      nombre:[''],
      correo:['']
    })
   }

  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log(this.id);
    console.log(this.formularioDeEmpleados.value);
    this.crudService.EditarEmpleado(this.id,this.formularioDeEmpleados.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/listar-empleado');
    });
    
  }

}
