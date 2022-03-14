import { Component, OnInit } from '@angular/core';
import { GarantesService } from './garantes.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HomeService } from 'src/app/home/home.service';
import { Persona } from '../persona.model';
import { AttachSession } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-garantes',
  templateUrl: './garantes.page.html',
  styleUrls: ['./garantes.page.scss'],
})
export class GarantesPage implements OnInit {

  constructor(private garanteService: GarantesService, private homeService: HomeService, private menuCtrl: MenuController, private garantesService: GarantesService, private router: Router) { }
  garantes: Persona[];
  usuarioId: any;
  usuario: any;
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    console.log(this.usuarioId);
    this.garantesService.getGarantes()
    .subscribe(data => {
      console.log(data);
      console.log(this.usuarioId);
      this.garantes = data.filter(data => this.usuarioId === data.usuario);
      console.log(this.garantes);
      this.garantes = this.garantes.map(garante =>{
        return {
        id: garante.id,
        nombre: garante.nombre,
        apellido: garante.apellido,
        DNI: garante.DNI,
        CUIT: garante.CUIT,
        telefono: garante.telefono,
        direccion: garante.direccion,
        email: garante.email,
        cuenta_bancaria: garante.cuenta_bancaria,
        usuario: garante.usuario
        };
      });
  });
    
  }

  goToHome() {
    this.router.navigate(['/home' , this.usuarioId]);
  }

  addNewGarante(){
    this.router.navigate(['/garante-add']);
  }
  updateGarante(garanteId){
  console.log(garanteId);
  this.router.navigate(['/garante-update', garanteId]);
  }
  verGarantes(garanteId){
    this.router.navigate(['/garantes', garanteId]);
  }
  toggleMenu() {
    this.menuCtrl.toggle();
   }
  
   doRefresh(event) {
    console.log('Begin async operation');
    this.usuarioId = this.homeService.setUsuarioId();
    console.log(this.usuarioId);
    this.garantesService.getGarantes()
    .subscribe(data => {
      console.log(data);
      console.log(this.usuarioId);
      this.garantes = data.filter(data => this.usuarioId === data.usuario);
      console.log(this.garantes);
      this.garantes = this.garantes.map(garante =>{
        return {
        id: garante.id,
        nombre: garante.nombre,
        apellido: garante.apellido,
        DNI: garante.DNI,
        CUIT: garante.CUIT,
        telefono: garante.telefono,
        direccion: garante.direccion,
        email: garante.email,
        cuenta_bancaria: garante.cuenta_bancaria,
        usuario: garante.usuario
        };
      });
  });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
