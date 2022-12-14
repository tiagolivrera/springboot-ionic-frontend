import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from "./../../services/domain/cliente.service";
import { ClienteDTO } from "./../../models/cliente.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService
  ) { }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.cliente = response;
          // buscar imagem no bucket S3
          this.getImageIfExists();
        },
        (error) => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        }
      );
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  // verifica se a imagem do cliente existe no bucket
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseURL}/cp${this.cliente.id}.jpg`;
      },
        error => { });
  }
}
