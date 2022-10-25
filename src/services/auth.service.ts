import { StorageService } from "./storage.service";
import { LocalUser } from "./../models/local_user";
import { API_CONFIG } from "./../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  authenticate(creds: CredenciaisDTO) {
    // acessa o backend para fazer o login
    return this.http.post(`${API_CONFIG.baseURL}/login`, creds, {
      observe: "response", // captura a resposta do login via backend
      responseType: "text", // o corpo da resposta e vazio, entao uso um tipo texto pq senao o front pode converter para JSON, o que pode dar erro
    });
  }

  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7); // retira o "Bearer " que vem no inicio do cabecalho
    let user: LocalUser = {
      token: tok,
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
