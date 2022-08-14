import { FormGroup } from "@angular/forms";


/**
 * Función para validar que el valor en el campo de 'Confirmar contraseña' sea igual que en el de 'Contraseña'
 */
export function matchPassword(password: string, confirmPassword: string) {
      return (formGroup: FormGroup) => {
        const password = formGroup.get('password');
        const confirmPassword = formGroup.get('confirmPassword');
  
        if (confirmPassword!.errors && !confirmPassword!.errors.mustMatch) {
          return;
        }
        if (password!.value !== confirmPassword!.value) {
          confirmPassword!.setErrors({ mustMatch: true });
        } else {
          confirmPassword!.setErrors(null);
        }
      };
  }