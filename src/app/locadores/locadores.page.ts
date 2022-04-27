import { Component, OnInit } from '@angular/core';
import { LocadoresService } from './locadores.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Persona } from '../persona.model';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-locadores',
  templateUrl: './locadores.page.html',
  styleUrls: ['./locadores.page.scss'],
})
export class LocadoresPage implements OnInit {
  constructor(private homeService: HomeService, private menuCtrl: MenuController, private locadoresService: LocadoresService, private router: Router) { }
  locadores: Persona[];
  usuarioId: any;
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.locadoresService.getLocadores()
    .subscribe(data => {
      console.log(data);
      this.locadores = data.filter(data => this.usuarioId === data.usuario);
      console.log(this.locadores);
      this.locadores = this.locadores.map(garante =>{
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
ionViewWillEnter(){
  this.usuarioId = this.homeService.setUsuarioId();
  this.locadoresService.getLocadores()
  .subscribe(data => {
    console.log(data);
    this.locadores = data.filter(data => this.usuarioId === data.usuario);
    console.log(this.locadores);
    this.locadores = this.locadores.map(garante =>{
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
    this.router.navigate(['/home', this.usuarioId]);
  }

addNewLocador(){
    this.router.navigate(['/locador-add']);
  }

  updateLocador(locadorId){
    console.log(locadorId);
    this.router.navigate(['/locador-update', locadorId]);
    }
  verLocador(locadorId){
    this.router.navigate(['/locadores', locadorId]);
    }
    toggleMenu() {
      this.menuCtrl.toggle();
     }

     doRefresh(event) {
      console.log('Begin async operation');
      this.usuarioId = this.homeService.setUsuarioId();
      console.log(this.usuarioId);
      this.locadoresService.getLocadores()
      .subscribe(data => {
        console.log(data);
        console.log(this.usuarioId);
        this.locadores = data.filter(data => this.usuarioId === data.usuario);
        this.locadores = this.locadores.map(garante =>{
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
