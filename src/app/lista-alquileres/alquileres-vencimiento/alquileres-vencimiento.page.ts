import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/contratos/contrato.model';
import { ContratosService } from 'src/app/contratos/contratos.service';
import { HomeService } from 'src/app/home/home.service';
import { Pago } from 'src/app/pagos/pago.model';
import { PagosService } from 'src/app/pagos/pagos.service';
import { PropiedadesService } from 'src/app/propiedades/propiedades.service';

@Component({
  selector: 'app-alquileres-vencimiento',
  templateUrl: './alquileres-vencimiento.page.html',
  styleUrls: ['./alquileres-vencimiento.page.scss'],
})
export class AlquileresVencimientoPage implements OnInit {
  m: any;
  date: any;
  anio: any;
  pagos: Pago[];
  contratos: Contrato[];
  contratoFecha: any;
  contratoFechaMes: any;
  propiedadName: any;
  usuarioId: any;

    constructor(private homeService: HomeService, private pagoService: PagosService,  private contratosService: ContratosService, private propiedadService: PropiedadesService) { }
  
    ngOnInit() {
      this.usuarioId = this.homeService.setUsuarioId();
      function getMes(index){
        const mes = new Array(12);
        mes[0] = 1;
        mes[1] = 2;
        mes[2] = 3;
        mes[3] = 4;
        mes[4] = 5;
        mes[5] = 6;
        mes[6] = 7;
        mes[7] = 8;
        mes[8] = 9;
        mes[9] = 10;
        mes[10] = 11;
        mes[11] = 12;
        return mes[index];
      }
      const d = new Date();
      this.m = getMes(d.getMonth());
      console.log(this.m);
      this.date = d.getDate();
      this.anio = d.getFullYear();
      this.pagoService.getPagos()
      this.contratosService.getContratos()
      .subscribe(data => {
        this.contratos = data;
        this.contratoFecha = data.fecha_egreso;
    });
    this.contratosService.getContratos()
    .subscribe(data => {
      this.contratos = data;
      this.propiedadName = this.propiedadService.getPropiedadId(data.propiedad).ubicacion
  });
    this.contratosService.getContratos()
    .subscribe(data => { 
     this.contratos = data.filter(data => new Date(data.fecha_egreso).getMonth()+1 === this.m && this.usuarioId === data.usuario);
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
            contratoFechaMes: new Date(contrato.fecha_egreso).getMonth()+1,
            locador: contrato.locador,
            inquilino: contrato.inquilino,
            garante: contrato.garante,
            propiedadName: this.propiedadService.getPropiedadId(contrato.propiedad).ubicacion,
            usuario: contrato.usuario
          };
          });
        console.log(this.contratos);
      });    
  }

  
    ionViewDidEnter(){
      // FILTRO Y MAPEO DE TODOS LOS CONTRATOS A PUNTO DE VENCER
      this.contratosService.getContratos()
      .subscribe(data => { 
       this.contratos = data.filter(data => new Date(data.fecha_egreso).getMonth()+1 === this.m);
       this.contratos = this.contratos.map(contrato => {
            return {
              id: contrato.id,
              valor: contrato.valor,
              honorarios: contrato.honorarios,
              fecha_ingreso: contrato.fecha_ingreso,
              fecha_egreso: contrato.fecha_egreso,
              fecha_rescision: contrato.fecha_rescision,
              vencimiento_pago: contrato.vencimiento_pago,
              tipo_contrato: contrato.tipo_contrato,
              propiedad: contrato.propiedad,
              contratoFechaMes: new Date(contrato.fecha_egreso).getMonth()+1,
              locador: contrato.locador,
              inquilino: contrato.inquilino,
              garante: contrato.garante,
              propiedadName: this.propiedadService.getPropiedadId(contrato.propiedad).ubicacion,
              usuario: contrato.usuario
            };
            });
          console.log(this.contratos);
        });     
}
}