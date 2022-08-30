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
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("passou");
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

      console.log("Erro capturado pelo interceptor:");
      console.log(errorObj);

      return Observable.throw(errorObj);
    }) as any;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
