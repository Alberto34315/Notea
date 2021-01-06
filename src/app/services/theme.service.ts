import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
const TH_KEY = 'SELECTED_THEME';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selected = "";
  renderer:Renderer2;
  constructor(private renderFactory:RendererFactory2, @Inject(DOCUMENT) private document:Document,
  private storage: NativeStorage) { 
    this.renderer=this.renderFactory.createRenderer(null,null);
  }

  public setInitialAppTheme() {
      this.storage.getItem(TH_KEY).then(val => {
        if (val) {
            this.setThemes(val);
             this.selected = val;
        }
      });
    
    
  }

  public getThemes() {
    return [
      { text: "Dark", value: "dark-theme" },
      { text: "Blue", value: "blue-theme" },
      { text: "Light", value:"light-theme" }
    ]
  }
  public setThemes(th) {
    this.Themes(th);
    this.selected=th;
    this.storage.setItem(TH_KEY,th);
  }
 public Themes(th){
    switch(th){
      case "dark-theme":
        this.renderer.addClass(this.document.body,"dark-theme");
        break;
      
      case "blue-theme":
        this.renderer.addClass(this.document.body,"blue-theme");
        break;
      
        case "light-theme":
        this.renderer.addClass(this.document.body,"light-theme");
        break;
        
        default:
          this.renderer.addClass(this.document.body,"light-theme");
          break;
    }
  }
  public removeClass(){
      this.document.body.classList.forEach(element => {
        if(element!="backdrop-no-scroll"){
          this.renderer.removeClass(this.document.body,element);
        }
      });
      
  }
}
