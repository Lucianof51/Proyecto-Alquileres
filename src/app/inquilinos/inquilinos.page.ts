import { Component, OnInit } from '@angular/core';
import { InquilinosService } from './inquilinos.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Persona } from '../persona.model';
import { HomeService } from '../home/home.service';
@Component({
  selector: 'app-inquilinos',
  templateUrl: './inquilinos.page.html',
  styleUrls: ['./inquilinos.page.scss'],
})
export class InquilinosPage implements OnInit {

  constructor(private homeService: HomeService, private menuCtrl: MenuController, private inquilinosService: InquilinosService, private router: Router) { }
  inquilinos: Persona[];
  usuarioId: any;
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.inquilinosService.getInquilinos()
    .subscribe(data => {
      console.log(data);
      this.inquilinos = data.filter(data => this.usuarioId === data.usuario);
      this.inquilinos = this.inquilinos.map(garante =>{
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

  addNewInquilino(){
    this.router.navigate(['/inquilino-add']);
  }

  updateInquilino(inquilinoId){
    console.log(inquilinoId);
    this.router.navigate(['/inquilino-update', inquilinoId]);
    }
  verInquilino(inquilinoId){
    this.router.navigate(['/inquilinos', inquilinoId]);
    }

  toggleMenu() {
      this.menuCtrl.toggle();
     }
  doRefresh(event) {
      console.log('Begin async operation');
      this.usuarioId = this.homeService.setUsuarioId();
      console.log(this.usuarioId);
      this.inquilinosService.getInquilinos()
      .subscribe(data => {
        console.log(data);
        console.log(this.usuarioId);
        this.inquilinos = data.filter(data => this.usuarioId === data.usuario);
        this.inquilinos = this.inquilinos.map(garante =>{
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
