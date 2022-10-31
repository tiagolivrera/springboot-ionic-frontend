export interface ClienteDTO {
  id: string;         // inclui os mesmos campos do ClienteDTO do backend
  nome: string;
  email: string;
  imageUrl? : string; // a imagem do usuario é um campo opcional (?)
}
