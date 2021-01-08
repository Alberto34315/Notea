import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalController} from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { NotasService } from 'src/app/services/notas.service';
import * as L from "leaflet";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PresentService } from 'src/app/services/present.service';
@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.page.html',
  styleUrls: ['./edit-nota.page.scss'],
})
export class EditNotaPage {
  @Input("nota") nota: Nota;
  public map: L.Map;
  public marker: any;
  public task: FormGroup;
  public coor: any;
  constructor(private formBuilder: FormBuilder,
    private notasS: NotasService,
    private present: PresentService,
    private modalController: ModalController,
    private geolocation: Geolocation) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })

  }
  ionViewDidEnter() {
    this.task.get('title').setValue(this.nota.titulo);
    this.task.get('description').setValue(this.nota.texto);
    this.map = L.map('map', {
      center: [this.nota.coordenadas[0], this.nota.coordenadas[1]],
      zoom: 30,
      renderer: L.canvas()
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.showMarker(this.nota.coordenadas);
    setTimeout(() => {
      this.map.invalidateSize();
    }, 400);
  }

  showMarker(latLong) {
    this.marker = L.marker(latLong, {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/icon/marker-icon-2x.png'
      })
    });
    this.marker.addTo(this.map)
      .bindPopup(this.nota.coordenadas[0] + "/" + this.nota.coordenadas[1]);
    this.map.setView([this.nota.coordenadas[0], this.nota.coordenadas[1]], 30)
  }

  public async sendForm() {
    await this.present.presentLoading();
    this.coor = await this.geolocation.getCurrentPosition();
    let data: Nota = {
      titulo: this.task.get('title').value,
      texto: this.task.get('description').value,
      coordenadas: [this.coor.coords.latitude, this.coor.coords.longitude]
    }
    this.notasS.actualizaNota(this.nota.id, data).then((respuesta) => {
      this.present.dismissLoad();
      this.nota = null;
      this.present.presentToast("Nota Guardada", "success");
      this.modalController.dismiss();
    }).catch((err) => {
      this.present.dismissLoad();
      this.present.presentToast("Error guardando nota", "danger");
    })
  }
  
}
