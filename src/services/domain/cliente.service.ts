import { StorageService } from "./../storage.service";
import { API_CONFIG } from "./../../config/api.config";
import { Observable } from "rxjs/Rx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClienteDTO } from "../../models/cliente.dto";

@Injectable()
export class ClienteService {
  constructor(public http: HttpClient, public storage: StorageService) { }

  findByEmail(email: string): Observable<ClienteDTO> {
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    // utilizando a url do mesmo jeito que foi definido no endpoint do backend
    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseURL}/clientes/email?value=${email}`,
      { 'headers': authHeader } // passando o cabecalho para a requisicao
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }
}
