import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
@Injectable({
  providedIn: 'root'
})
export class TTSService {

  constructor(private tts: TextToSpeech) { }
  talk(text) {
    return this.tts.speak({
      text: text,
      locale: 'es-ES',
      rate: 1
    })
      .then(() => console.log("Leido con exito"))
      .catch((failed: any) => console.log(failed));
  }
}
