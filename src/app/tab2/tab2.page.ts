import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nota } from '../model/nota';
import { NotasService } from '../services/notas.service';
import { PresentService } from '../services/present.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public task: FormGroup;
  public coor: any;
  public data: Nota;
  public isCheked: boolean;
  constructor(private formBuilder: FormBuilder,
    private notasS: NotasService,
    private present: PresentService,
    private geolocation: Geolocation) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })
  }
  public async sendForm() {
    await this.present.presentLoading();
    if (this.isCheked) {
      await this.geolocation.getCurrentPosition().then((resp) => {
        this.coor = [resp.coords.latitude, resp.coords.longitude]
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      if (this.coor != null) {
        this.data = {
          titulo: this.task.get('title').value,
          texto: this.task.get('description').value,
          coordenadas: this.coor
        }
      }
    } else {
      this.data = {
        titulo: this.task.get('title').value,
        texto: this.task.get('description').value
      }
    }

    this.coor = null;
    this.notasS.agregaNota(this.data).then((respuesta) => {
      this.task.setValue({
        title: '',
        description: ''
      })
      this.present.dismissLoad();
      this.present.presentToast("Nota Guardada", "success");
    }).catch((err) => {
      this.present.dismissLoad();
      this.present.presentToast("Error guardando nota", "danger");
    })
  }
  public async location($event) {
    if ($event.detail.checked) {
      this.isCheked = true;
    } else {
      this.isCheked = false;
    }
  }
}
