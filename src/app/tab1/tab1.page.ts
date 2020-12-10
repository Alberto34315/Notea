import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { NotaPage } from '../pages/nota/nota.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public searchTerm: string = "";
  public listaNotas = [];
  public items: any;
  constructor(private notasS: NotasService,
    private modalController: ModalController,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController) {

  }

  async presentAlert(id: any) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro que quieres borrar la nota?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Si',
        handler: () => {
          // AquÍ borramos el sitio en la base de datos
          this.borraNota(id);
          this.modalController.dismiss();
        }
      }]


    });
    await alert.present();
  }

  async ngOnInit() {
    this.cargaDatos();
    //NATIVE STORAGE
    this.nativeStorage.setItem('myitem', { property: 'value', anotherProperty: 'anotherValue' })
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    this.nativeStorage.getItem('myitem')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  ionViewDidEnter() {
    this.notasS.loadCollection();
    this.cargaDatos();
    //Mostrar el loading
  }

  public cargaDatos($event = null) {
    try {
      this.notasS.leeNotas()
        .subscribe((info: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaNotas = [];
          info.forEach((doc) => {
            let nota = {
              id: doc.id,
              ...doc.data()
            }
            this.listaNotas.push(nota);
            this.items = this.listaNotas;
          });
          //Ocultar loading
          console.log(this.listaNotas);
          if ($event) {
            $event.target.complete();
          }
        })
      this.loadingController.dismiss();
      this.presentToast("Notas Cargadas", "success");
    } catch (err) {
      //Error
      this.loadingController.dismiss();
      this.presentToast("Error cargando notas", "danger");
    }
  }

  public async borraNota(id: any) {
    //   await this.presentLoading();
    this.notasS.borraNota(id).then(() => {
      //Ya está borrada
      let tmp = [];
      this.listaNotas.forEach((nota) => {
        if (nota.id != id) {
          tmp.push(nota)
        }
      })
      this.listaNotas = tmp;
      this.items = this.listaNotas;
      this.loadingController.dismiss();
      this.presentToast("Nota Borrada Con Exito", "success");
    })
      .catch(err => {
        //Error
        this.loadingController.dismiss();
        this.presentToast("Error Al Borrar La Nota", "danger");
      })
  }
  async editaNota(nota: Nota) {
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        nota: nota
      }
    });
    return await modal.present();
  }
  async mostrarNota(nota: Nota) {
    const modal = await this.modalController.create({
      component: NotaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        nota: nota
      }
    });
    return await modal.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner: "crescent"
    });
    await loading.present();
  }
  async presentToast(msg: string, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  getItems(ev: any) {
    const val = ev.target.value;
    this.items = this.listaNotas;
    if (val && val.trim() != '') {
      this.items = this.items.filter((data) => {
        return (data.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}