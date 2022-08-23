import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../myModels/user.model';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  transform(value: User[], arg: number): unknown {
    return value[arg-1];
  }

}
