import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "./../../config/api.config";
import { CategoriaDTO } from "./../../models/categoria.dto";

@Injectable()
export class CategoriaService {
  constructor(public http: HttpClient) {}

  // Observable: a captura de dados da API é feita de forma assíncrona, por isso usa-se um "observador" com o tipo de dados que se espera receber.
  findAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseURL}/categorias`);
  }
}
