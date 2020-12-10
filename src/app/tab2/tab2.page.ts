import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public task: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private notasS: NotasService,
    private loadingController: LoadingController,
    private toastController: ToastController) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })
  }
  public async sendForm() {
    await this.presentLoading();
    let data: Nota = {
      titulo: this.task.get('title').value,
      texto: this.task.get('description').value
    }
    this.notasS.agregaNota(data).then((respuesta) => {
      this.task.setValue({
        title: '',
        description: ''
      })
      this.loadingController.dismiss();
      this.presentToast("Nota Guardada","success");
    }).catch((err) => {
      this.loadingController.dismiss();
      this.presentToast("Error guardando nota","danger");
    })
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
