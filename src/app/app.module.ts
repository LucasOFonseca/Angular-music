import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

dayjs.locale('pt-br');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TopBarComponent],
  providers: [provideHttpClient(withInterceptors([AuthInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
