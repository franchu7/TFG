import { FormGroup } from "@angular/forms";

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