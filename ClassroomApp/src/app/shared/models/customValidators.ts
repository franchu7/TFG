import { FormGroup } from "@angular/forms";


/**
 * Función para validar que el valor en el campo de 'Confirmar contraseña' sea igual que en el de 'Contraseña'
 */
export function matchPassword(password: string, confirmPassword: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.get('password');
        const matchingControl = formGroup.get('confirmPassword');
  
        if (matchingControl!.errors && !matchingControl!.errors.mustMatch) {
          return;
        }
        if (control!.value !== matchingControl!.value) {
          matchingControl!.setErrors({ mustMatch: true });
        } else {
          matchingControl!.setErrors(null);
        }
      };
  }