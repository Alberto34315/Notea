import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotasService } from './services/notas.service';
import { EditNotaPage } from './pages/edit-nota/edit-nota.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from './services/auth.service';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { NotaPage } from './pages/nota/nota.page';
import { PresentService } from './services/present.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ThemeService } from './services/theme.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, EditNotaPage, NotaPage],
  entryComponents: [EditNotaPage, NotaPage],
  imports: [BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    NotasService,
    PresentService,
    ThemeService,
    NativeStorage,
    GooglePlus,
    AuthService,
    Flashlight,
    Shake,
    NavController,
    Geolocation,/*
    Push,*/
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
