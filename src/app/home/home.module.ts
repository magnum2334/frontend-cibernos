import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsernameFromEmailPipe } from '../pipe/username-from-email.pipe';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent, UsernameFromEmailPipe],
  imports: [CommonModule, HttpClientModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
