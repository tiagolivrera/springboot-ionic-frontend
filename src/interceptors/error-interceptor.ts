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
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {}

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
        case 403: // tratamento para o erro 403
          this.handle403();
          break;
      }

      return Observable.throw(errorObj);
    }) as any;
  }

  handle403() {
    // remove o user (caso exista) do storage
    this.storage.setLocalUser(null);
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
