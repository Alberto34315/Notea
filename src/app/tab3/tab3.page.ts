import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router,private authS: AuthService,private flashlight: Flashlight ,
    private loadingController: LoadingController,
    private toastController: ToastController) {}
    
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }
  public async encender(){
    await this.presentLoading();
    if (this.flashlight.isSwitchedOn()) {
      this.flashlight.switchOff()
      this.loadingController.dismiss();
      this.presentToast("Linterna Apagada","danger");
    }else{
      this.flashlight.switchOn()
      this.loadingController.dismiss();
      this.presentToast("Linterna Encendida","success");
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner: "crescent"
    });
    await loading.present();
  }
  async presentToast(msg:string,col:string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position:"top"
    });
    toast.present();
  }
}
