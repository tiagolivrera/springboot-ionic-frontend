import { API_CONFIG } from './../config/api.config';
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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    // verifica se o cabecalho da requisicao comeca com baseURL. Caso sim, entrega a autorizacao
    let N = API_CONFIG.baseURL.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseURL; // caso seja verdadeiro, a requisicao é de fato para a nossa API

    // verifica se ha um localUser no storage
    if (localUser && requestToAPI) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
