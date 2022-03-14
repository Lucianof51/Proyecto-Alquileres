import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Usuario } from '../login/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  activatedRoute: any;
  usuarioId: number;
  usuario: Usuario[];
  constructor(private loginService: LoginService) { }

  getUsuarioId(id){
    this.usuarioId = id;
    return id;
  }
  setUsuarioId(){
    return this.usuarioId;
    }
  UsuarioId(){
    console.log(this.usuarioId);
  }
}

