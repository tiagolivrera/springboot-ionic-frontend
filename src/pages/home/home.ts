import { Component } from "@angular/core";
import { IonicPage, MenuController, NavController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  constructor(public navCtrl: NavController, public menu: MenuController) {}

  // desabilita o menu lateral na tela de login
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  // habilita o menu lateral ao sair da tela de login
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.navCtrl.setRoot("CategoriasPage");
  }
}
