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
      this.coor = await this.geolocation.getCurrentPosition();
      this.data = {
        titulo: this.task.get('title').value,
        texto: this.task.get('description').value,
        coordenadas: [this.coor.coords.latitude, this.coor.coords.longitude]
      }
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

}
