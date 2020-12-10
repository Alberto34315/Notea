import { Component, Input, OnInit } from '@angular/core';
import { Shake } from '@ionic-native/shake/ngx';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { Tab1Page } from 'src/app/tab1/tab1.page';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {
  @Input("nota") nota: Nota;
  constructor(private modalController: ModalController,
    private shake: Shake,
    private tab1: Tab1Page) { 
   
  }

  ngOnInit() {
    this.shake.startWatch().subscribe(() => {
      if (this.nota!=null) {
        this.tab1.presentAlert(this.nota.id);
        this.nota=null;
      }
    });
  }
  public exit() {
    this.modalController.dismiss();
  }
}
