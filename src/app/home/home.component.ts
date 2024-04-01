import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
// register Swiper custom elements
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    FooterComponent,
    HeaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userData: any;
  stateUser = false;
  data = false;
  showState = false;
  homeClicked: boolean = false;
  images: string[] = []; // Lista de imágenes
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    for (let i = 1; i <= 5; i++) {
      this.images.push(`https://via.placeholder.com/1400x400/0000${i}`);
    }
  }
  

  async checkLoginStatus() {
    this.isLoggedIn = await this.authService.isLogin();
    if (this.isLoggedIn) {
      await this.authService.userDataState();
      this.userData = await this.authService.getUserData();
    } else {
      this.router.navigate(['/']);
    }
  }
  async logout() {
    try {
      // Limpiar el token del localStorage
      localStorage.removeItem('token');
      // Redirigir al usuario al login
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      // Manejar errores
      throw error;
    }
  }
  userState() {
    this.showState = true;
  }
}