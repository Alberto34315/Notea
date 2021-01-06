import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS:AuthService,
    private language:LanguageService,
    private theme:ThemeService/*,
    private push: Push*/
  ) {
    this.initializeApp();
  }

 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authS.init();
      this.language.setInitialAppLanguage();
      this.theme.setInitialAppTheme();
     // this.pushSetup();
    });
  }
 /* pushSetup(){
    const options: PushOptions = {
       android: {
           // Añadimos el sender ID para Android.
           senderID: '316010083506'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }*/
}
