import { API_CONFIG } from "./../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";

@Injectable()
export class AuthService {
  constructor(public http: HttpClient) {}

  authenticate(creds: CredenciaisDTO) {
    // acessa o backend para fazer o login
    return this.http.post(`${API_CONFIG.baseURL}/login`, creds, {
      observe: "response",  // captura a resposta do login via backend
      responseType: 'text'  // o corpo da resposta e vazio, entao uso um tipo texto pq senao o front pode converter para JSON, o que pode dar erro
    });
  }
}
