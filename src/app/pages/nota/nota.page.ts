import { Component, Input, OnInit } from '@angular/core';
import { Shake } from '@ionic-native/shake/ngx';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import * as L from "leaflet";
import { TTSService } from 'src/app/services/tts.service';
@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {
  @Input("nota") nota: Nota;
  @Input("padre") padre: Tab1Page;
  public map: L.Map;
  public marker:any;
  public text;
  constructor(private modalController: ModalController,
    private shake: Shake,private speak:TTSService) {

  }

  ngOnInit() {
    this.shake.startWatch().subscribe(() => {
      if (this.nota != null) {
        this.padre.presentAlert(this.nota.id);
        this.nota = null;
      }
    });
    this.map = L.map('map', {
      center: [this.nota.coordenadas[0], this.nota.coordenadas[1]],
      zoom: 30,
      renderer: L.canvas()
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.showMarker(this.nota.coordenadas);
    setTimeout(()=>{
      this.map.invalidateSize();
    }, 400);
  }
  showMarker(latLong) {
    this.marker = L.marker(latLong,{icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'assets/icon/marker-icon-2x.png'
    })});
    this.marker.addTo(this.map)
    .bindPopup(this.nota.coordenadas[0]+"/"+this.nota.coordenadas[1]);
    this.map.setView([this.nota.coordenadas[0], this.nota.coordenadas[1]],30)
}
  public exit() {
    this.modalController.dismiss();
  }
  read() {
    this.text = this.nota.texto
    this.speak.talk(this.text);
  }
}
