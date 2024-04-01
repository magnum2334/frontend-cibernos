import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async login(email: any, password: any) {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      // Guardar el token
      this.setToken(response.data.accessToken);
      // Redirigir al usuario al home si el login es correcto
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
      // Manejar errores
      throw error;
    }
  }

  async isLogin() {
    // Verificar si hay un token guardado
    return !!this.getToken();
  }

  // Guardar el token
  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  // Obtener el token
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
  setUserData(userData: any) {
    this.userData = userData;
    return this.userData;
  }

  // Obtener los datos del usuario guardados en userData
  getUserData(): any {
    return this.userData ?? '';
  }

  async userDataState() {
    try {
      // Obtener el token de localStorage
      const token = localStorage.getItem('token');

      if (!token) return false;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        'http://localhost:3000/auth/profile',
        config
      );
      this.setUserData(response.data.user);
      return response.data.user;
    } catch (error) {
      console.log(error);
      // Manejar errores
      return false;
    }
  }
}
