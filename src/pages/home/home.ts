import { Component } from "@angular/core";
import { IonicPage, MenuController, NavController } from "ionic-angular";
import { CredenciaisDTO } from "../../models/credenciais.dto";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {

  // objeto recebe o valor dos campos login e senha (inicia vazio)
  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

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
    console.log(this.creds);
    this.navCtrl.setRoot("CategoriasPage");
  }
}
