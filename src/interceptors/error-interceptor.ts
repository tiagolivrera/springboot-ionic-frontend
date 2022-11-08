import { StorageService } from './../services/storage.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService, public alertCtrl: AlertController) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //console.log("passou");
    return next.handle(req).catch((error, caught) => {
      // saida de erro personalizado: retorna no console apenas o campo erro da mensagem
      let errorObj = error;
      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      // caso a resposta de erro nao esteja em formato JSON, converte para JSON
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      //console.log("Erro capturado pelo interceptor:");
      //console.log(errorObj);

      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;
        case 403: // tratamento para o erro 403
          this.handle403();
          break;
        default:
          this.handleDefaultError(errorObj);
          break;
      }

      return Observable.throw(errorObj);
    }) as any;
  }

  handle403() {
    // remove o user (caso exista) do storage
    this.storage.setLocalUser(null);
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorreta',
      enableBackdropDismiss: false, // para sair precisa apertar no botao do alert
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  handleDefaultError(errorObj) {
    let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false, // para sair precisa apertar no botao do alert
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
