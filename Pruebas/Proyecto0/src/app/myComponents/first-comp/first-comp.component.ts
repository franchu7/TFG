import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/myServices/main.service';

@Component({
  selector: 'app-first-comp',
  templateUrl: './first-comp.component.html',
  styleUrls: ['./first-comp.component.css']
})
export class FirstCompComponent implements OnInit {

  @Input() parentName: string;

  public componentName: string;

  constructor() {
    this.parentName = '',
    this.componentName = 'First Component'
  }

  ngOnInit(): void {

  }

  getValue(event: any): void {
    console.log("Nombre del componente: " + this.componentName);
  }

}
