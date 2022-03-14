import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Usuario } from '../login/usuario.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuarioId: number;
  usuario: Usuario[];
  recipeId: any;
  providers: []
  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute, private router: Router,
    // tslint:disable-next-line:align
    private menuCtrl: MenuController, private http: HttpClient, private loginService: LoginService) {}
    

 ngOnInit(){
  this.activatedRoute.paramMap.subscribe(paramMap => {
    const recipeId = paramMap.get('usuarioId');
    this.usuarioId = Number(recipeId);
    console.log(this.usuarioId);
    console.log(this.homeService.getUsuarioId(this.usuarioId));
    console.log(this.homeService.setUsuarioId());
    this.loginService.getUsuarioId(recipeId)
  .subscribe(data => {
    this.usuario = data;
    console.log(this.usuario);
  });
  });
  function getDia(index){
    const dia = new Array(7);
    dia[0] = 'Domingo';
    dia[1] = 'Lunes';
    dia[2] = 'Martes';
    dia[3] = 'Miércoles';
    dia[4] = 'Jueves';
    dia[5] = 'Viernes';
    dia[6] = 'Sábado';
    return dia[index];
}
  const d = new Date();
  const n = getDia(d.getDay());
 }

 toggleMenu() {
 
  this.menuCtrl.toggle();
 }


 detalle_caja(){
  this.router.navigate(['/detalle_caja']);
}

lista_alquileres(){
  this.router.navigate(['/lista_alquileres']);
}

reportes(){
  this.router.navigate(['/reportes']);
}

avisos(){
  this.router.navigate(['/avisos']);
}
newCliente(nombre2: HTMLInputElement, edad2: HTMLInputElement){
    const Nombre = nombre2.value;
    const Edad = edad2.value;
    // tslint:disable-next-line:variable-name
    const val = {
      Nombre,
      Edad,
    };
    console.log(val)
    this.http.post('http://127.0.0.1:8000/registro/', val).subscribe(
  data => console.log(data),
  error => console.log(error)
);
}
}

