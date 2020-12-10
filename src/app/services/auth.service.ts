import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public user = {
    token: -1,
    name: '',
    avatar: '',
    userId:''
  }

  constructor(private storage: NativeStorage,
    private google: GooglePlus,
    private router:Router) {
  }

  async init() {
  //  console.log("AL INICIO DE LOS TIEMPOS")
    let u = null;
    try {
      u = await this.storage.getItem("user");
    } catch (err) {
      u = null;
    }
    if (u != null) {
      this.user = u;
    }
  }

  public isLogged(): boolean {
    if (this.user.token == -1) {
      return false;
    } else {
      return true;
    }
  }
  public async logout(){
    let u =  this.google.logout();
    this.user = {
      token: -1,
      name: '',
      avatar: '',
      userId:''
    }
    await this.storage.setItem("user",this.user);
  }
  public async login() {
    try {
      let u = await this.google.login({})
    //  console.log(u)
      if (u) {
     //   console.log("OK")
        this.user = {
          token: u['accessToken'],
          name: u['displayName'],
          avatar: u['imageUrl'],
          userId: u['userId']
        }
       // console.log(this.user);
      }
    } catch (err) {
      this.user = {
        token: -1,
        name: '',
        avatar: '',
        userId: ''
      }
    }
    await this.storage.setItem("user",this.user);
    return this.user;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
   // console.log("ESTOY EN CANACTIVATE Y EL RESULT ES "+this.isLogged())
    if (!this.isLogged()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
  getUser(){
    return this.user;
  }
}
