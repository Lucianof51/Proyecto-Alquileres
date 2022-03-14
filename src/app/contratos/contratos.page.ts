import { Component, OnInit } from '@angular/core';
import { ContratosService } from './contratos.service';
import { Router } from '@angular/router';
import { PropiedadesService } from '../propiedades/propiedades.service';
import { Contrato } from './contrato.model';
import { Propiedad } from '../propiedades/propiedad.model';
import { ContratosPropiedades } from './contratosPropiedades.model';
import { MenuController } from '@ionic/angular';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.page.html',
  styleUrls: ['./contratos.page.scss'],
})
export class ContratosPage implements OnInit {
  constructor(private homeService: HomeService, private menuCtrl: MenuController, private contratosService: ContratosService, private router: Router, private propiedadesService: PropiedadesService) { }
  contratos: Contrato[];
  propiedades: Propiedad[];
  contratosPropiedades: ContratosPropiedades;
  propiedadNombre: any;
  usuario: any;
  usuarioId: any;

  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.contratosService.getContratos()
    .subscribe(data => {
      console.log(this.usuarioId);
      this.propiedadNombre = this.propiedadesService.getPropiedadId(data.propiedad);
      this.contratos = data.filter(data => this.usuarioId === data.usuario);
     
    });
   
  }

  ionViewDidEnter(){
    this.usuarioId = this.homeService.setUsuarioId();
    this.contratosService.getContratos()
    .subscribe(data => {
      console.log(this.usuarioId);
      this.propiedadNombre = this.propiedadesService.getPropiedadId(data.propiedad);
      this.contratos = data.filter(data => this.usuarioId === data.usuario);
    });
  }


  goToHome() {
    this.router.navigate(['/home', this.usuarioId]);
  }

  addNewContrato(){
    this.router.navigate(['/contrato-add']);
  }

  verPagos(contratoId){
    console.log(contratoId);
    this.router.navigate(['/pagos', contratoId]);
    }

  updateContrato(contratoId){
    this.router.navigate(['/contrato-update', contratoId])
  }
  verContrato(contratoId){
    this.router.navigate(['/contratos', contratoId]);
  }
  toggleMenu() {
    this.menuCtrl.toggle();
   }
   doRefresh(event) {
    this.contratosService.getContratos()
    .subscribe(data => {
      this.contratos = data.filter(data => this.usuarioId === data.usuario);
    
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
