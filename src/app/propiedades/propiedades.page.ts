import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PropiedadesService} from './propiedades.service';
import { HttpClientModule } from '@angular/common/http';
import { Propiedad } from './propiedad.model';
import { AlertController, MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular'
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.page.html',
  styleUrls: ['./propiedades.page.scss'],
})
export class PropiedadesPage implements OnInit {


  constructor(private homeService: HomeService, private menuCtrl: MenuController, private propiedadService: PropiedadesService, public alertCtrl: AlertController,
    // tslint:disable-next-line:align
    private router: Router, public actionSheetController: ActionSheetController) { }
    propiedades: Propiedad[];
    usuarioId: any;
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    console.log(this.usuarioId);
    this.propiedadService.getPropiedades()
    .subscribe(data => {
      console.log(data);
      this.propiedades = data.filter(data => this.usuarioId === data.usuario);
      this.propiedades = this.propiedades.map(prop =>{
      return {
      id: prop.id,
      ubicacion: prop.ubicacion,
      estado: prop.estado,
      tipo: prop.estado,
      usuario: prop.usuario
      };
    });
    console.log(this.propiedades);
});
  }

  ionViewWillEnter(){
    this.usuarioId = this.homeService.setUsuarioId();
    console.log(this.usuarioId);
    this.propiedadService.getPropiedades()
    .subscribe(data => {
      console.log(data);
      this.propiedades = data.filter(data => this.usuarioId === data.usuario);
      this.propiedades = this.propiedades.map(prop =>{
      return {
      id: prop.id,
      ubicacion: prop.ubicacion,
      estado: prop.estado,
      tipo: prop.estado,
      usuario: prop.usuario
      };
    });
    console.log(this.propiedades);
});
  }

  toggleMenu() {
    this.menuCtrl.toggle();
   }
  addNewPlace(){
    this.router.navigate(['/new-place']);
  }

  goToHome() {
    this.router.navigate(['/home', this.usuarioId]);
  }

  updatePropiedad(propiedadId){
    this.router.navigate(['/propiedad-update', propiedadId]);
  }
  verPropiedad(propiedadId){
    this.router.navigate(['/propiedades', propiedadId]);
    }

  doRefresh(event) {
    console.log('Begin async operation');
    this.usuarioId = this.homeService.setUsuarioId();
    this.propiedadService.getPropiedades()
    .subscribe(data => {
      this.propiedades = data.filter(data => this.usuarioId === data.usuario);
      this.propiedades = this.propiedades.map(prop =>{
      return {
      id: prop.id,
      ubicacion: prop.ubicacion,
      estado: prop.estado,
      tipo: prop.estado,  
      usuario: prop.usuario
      };
    });
  });
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
}
