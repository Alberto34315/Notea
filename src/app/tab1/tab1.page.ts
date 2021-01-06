import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, MenuController, ModalController} from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { NotaPage } from '../pages/nota/nota.page';
import { PresentService } from '../services/present.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll:IonInfiniteScroll;
  public searchTerm: string = "";
  public listaNotas = [];
  public items: any;
  public page=10;
  constructor(private notasS: NotasService,
    private modalController: ModalController,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    private present:PresentService,
    private menuCtrl:MenuController) {

  }
  public async loadData(e) {
  
    setTimeout(() => {
      this.page=this.page+10;
      this.cargaDatos();
      e.target.complete();
      this.infiniteScroll.disabled=true;

      if (this.listaNotas.length == 1000) {
        e.target.disabled = true;
      }
    }, 500);
  }
  

  toggleMenu(){
    this.menuCtrl.toggle();
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
          if(this.listaNotas.length < this.page){
              this.listaNotas.push(nota);
              this.items = this.listaNotas;
            }
         
          });
          //Ocultar loading
          if ($event) {
            $event.target.complete();
          }
        })
      this.present.presentToast("Notas Cargadas", "success");
    } catch (err) {
      //Error
      this.present.presentToast("Error cargando notas", "danger");
    }
  }
 
  public async borraNota(id: any) {
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
      this.present.presentToast("Nota Borrada Con Exito", "success");
    })
      .catch(err => {
        //Error
        this.present.presentToast("Error Al Borrar La Nota", "danger");
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
        nota: nota,
        padre: this

      }
    });
    return await modal.present();
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