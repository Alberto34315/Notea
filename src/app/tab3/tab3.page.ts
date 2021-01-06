import { Component, OnInit } from '@angular/core';

import {  PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  selected='';
  idiom=[];
  constructor(
    private authS: AuthService,
    private popCtr: PopoverController,
    private languageS:LanguageService) { }

  ngOnInit() {
    this.idiom=this.languageS.getLanguages();
    this.selected=this.languageS.selected;
  }
  
  
  public select(lng){
    this.languageS.setLanguage(lng.target.value);
    this.popCtr.dismiss();
  }
}
