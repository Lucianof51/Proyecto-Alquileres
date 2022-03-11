import { Component, OnInit } from '@angular/core';
import { ContratosService } from './contratos.service';
import { Router } from '@angular/router';
import { PropiedadesService } from '../propiedades/propiedades.service';
import { Contrato } from './contrato.model';
import { Propiedad } from '../propiedades/propiedad.model';
import { ContratosPropiedades } from './contratosPropiedades.model';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.page.html',
  styleUrls: ['./contratos.page.scss'],
})
export class ContratosPage implements OnInit {
  constructor(private menuCtrl: MenuController, private contratosService: ContratosService, private router: Router, private propiedadesService: PropiedadesService) { }
  contratos: Contrato[];
  propiedades: Propiedad[];
  contratosPropiedades: ContratosPropiedades;
  propiedadNombre: any;

  ngOnInit() {
    this.contratosService.getContratos()
    .subscribe(data => {
      this.contratos = data;
      this.propiedadNombre = this.propiedadesService.getPropiedadId(data.propiedad);
  });
    this.contratosService.guardarDatos();
    this.contratos = this.contratosService.guardarDatos().map(contrato => {
      return {
        id: contrato.id,
        valor: contrato.valor,
        honorarios: contrato.honorarios,
        punitorios: contrato.punitorios,
        fecha_ingreso: contrato.fecha_ingreso,
        fecha_egreso: contrato.fecha_egreso,
        fecha_rescision: contrato.fecha_rescision,
        vencimiento_pago: contrato.vencimiento_pago,
        tipo_contrato: contrato.tipo_contrato,
        propiedad: contrato.propiedad,
       // propiedadName: this.propiedadNombre,
        locador: contrato.locador,
        inquilino: contrato.inquilino,
        garante: contrato.garante
      };
      });
      console.log(this.contratos)
  }

  ionViewDidEnter() {
   // this.contratosService.guardarDatos();
    this.contratos = this.contratosService.guardarDatos().map(contrato => {
      return {
        id: contrato.id,
        valor: contrato.valor,
        honorarios: contrato.honorarios,
        punitorios: contrato.punitorios,
        fecha_ingreso: contrato.fecha_ingreso,
        fecha_egreso: contrato.fecha_egreso,
        fecha_rescision: contrato.fecha_rescision,
        vencimiento_pago: contrato.vencimiento_pago,
        tipo_contrato: contrato.tipo_contrato,
        propiedad: contrato.propiedad,
        propiedadName: this.propiedadesService.getPropiedadId(contrato.propiedad).ubicacion,
        locador: contrato.locador,
        inquilino: contrato.inquilino,
        garante: contrato.garante
      };
      });
    console.log(this.contratos);
  }


  goToHome() {
    this.router.navigate(['/home']);
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
    console.log('Begin async operation');
    this.contratosService.getContratos()
    .subscribe(data => {
      console.log(data);
      this.contratos = data;
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
