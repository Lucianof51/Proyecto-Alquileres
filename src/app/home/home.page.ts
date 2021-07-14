import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router,
    // tslint:disable-next-line:align
    private menuCtrl: MenuController) {}

 ngOnInit(){
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
  console.log(n);
  console.log(d);
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

}

