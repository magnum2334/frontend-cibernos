import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Importa el servicio AuthService
import { AuthService } from '../service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) {} // Inyecta el servicio AuthService en el constructor

  async login() {
    try {
      const response = await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ); // Llama al método login() del servicio
      // Aquí manejas la respuesta de la autenticación
      console.log('Respuesta del servidor:', response);
      // También puedes manejar el token JWT aquí si es necesario
    } catch (error) {
      // Aquí manejo los errores de autenticación
      console.error('Error de autenticación:', error);
    }
  }
}
