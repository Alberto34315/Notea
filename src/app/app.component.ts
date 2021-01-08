import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM";
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
    private authS: AuthService,
    private language: LanguageService,
    private theme: ThemeService/*,
    private fcm: FCM*/
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
      //this.pushSetup();
    });
  }
  /*pushSetup() {
   this.fcm.getToken().then(token => {
      console.log(token);
    });
 
    // ionic push notification example
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });      

    // refresh the FCM token
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
  }*/
}
