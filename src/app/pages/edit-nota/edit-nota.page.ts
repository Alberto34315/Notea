import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { NotasService } from 'src/app/services/notas.service';
import { PresentService } from 'src/app/services/present.service';
@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.page.html',
  styleUrls: ['./edit-nota.page.scss'],
})
export class EditNotaPage {
  @Input("nota") nota: Nota;
  public task: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private notasS: NotasService,
    private present: PresentService,
    private modalController: ModalController) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })

  }
  ionViewDidEnter() {
    this.task.get('title').setValue(this.nota.titulo);
    this.task.get('description').setValue(this.nota.texto);
  }
  public async sendForm() {
    let data: Nota;
    await this.present.presentLoading();
    if(this.nota.coordenadas!=null){
      data = {
        titulo: this.task.get('title').value,
        texto: this.task.get('description').value,
        coordenadas: this.nota.coordenadas
      }
     }else{
      data = {
        titulo: this.task.get('title').value,
        texto: this.task.get('description').value
      }
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
