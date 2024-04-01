import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernameFromEmail',
  pure: true, // Set the pipe to be pure
})
export class UsernameFromEmailPipe implements PipeTransform {
  transform(email: string, userData: any): string {
    // Verificar el email
    if (!email || typeof email !== 'string' || !userData) {
      return '';
    }

    // Verificar si se encontró el correo electrónico en los datos del usuario
    if (userData.email === email) {
      return userData.name; // Devolver el nombre si se encuentra el correo electrónico
    } else {
      return ''; // Devolver cadena vacía si no se encuentra el correo electrónico
    }
  }
}
