import { Component } from "@angular/core";
import { IonicPage, MenuController, NavController } from "ionic-angular";
import { CredenciaisDTO } from "../../models/credenciais.dto";
import { AuthService } from "../../services/auth.service";

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

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {}

  // desabilita o menu lateral na tela de login
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  // habilita o menu lateral ao sair da tela de login
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("CategoriasPage");
      },
      error => {})
  }
}
