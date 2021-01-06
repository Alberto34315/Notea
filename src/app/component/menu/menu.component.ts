import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { MenuController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PresentService } from 'src/app/services/present.service';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input("contentId") contentId;
  selected='';
  themes=[];
  constructor(
    private router: Router,
    private authS: AuthService,
    private flashlight: Flashlight,
    private present: PresentService,
    private menuCtrl: MenuController,
    private theme:ThemeService,
    private popCtr: PopoverController) { }

  ngOnInit() {
    this.themes=this.theme.getThemes();
    this.selected=this.theme.selected;
  }
  public select(th){
    this.theme.removeClass();
    this.theme.setThemes(th.target.value);
    this.popCtr.dismiss();
  }

  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login']);
      this.menuCtrl.close();
    }
  }
  public async encender() {
    await this.present.presentLoading();
    if (this.flashlight.isSwitchedOn()) {
      this.flashlight.switchOff()
      this.present.dismissLoad();
      this.present.presentToast("Linterna Apagada", "danger");
    } else {
      this.flashlight.switchOn()
      this.present.dismissLoad();
      this.present.presentToast("Linterna Encendida", "success");
    }
  }
}
