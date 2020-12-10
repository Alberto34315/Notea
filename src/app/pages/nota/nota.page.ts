import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {
  @Input("nota") nota: Nota;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  public exit() {
    this.modalController.dismiss();
  }
}
