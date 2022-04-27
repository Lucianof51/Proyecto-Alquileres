import { Component, OnInit } from '@angular/core';
import { PagosService } from 'src/app/pagos/pagos.service';
import { Contrato } from 'src/app/contratos/contrato.model';
import { ContratosService } from 'src/app/contratos/contratos.service';
import { PropiedadesService } from 'src/app/propiedades/propiedades.service';
import { Pago } from 'src/app/pagos/pago.model';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private homeService: HomeService, private router: Router, private propiedadesService: PropiedadesService, private pagoService: PagosService, private contratoService: ContratosService) { }
  pagos: Pago[];
  contratoId: any;
  propiedadNombre: any;
  propiedadId: any;
  contratos: Contrato[];
  usuarioId: any;

  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();

      this.pagoService.getPagos()
    .subscribe(data => {
      this.pagos = data.filter(data => this.usuarioId === data.usuario);
      this.propiedadNombre = this.propiedadesService.getPropiedadId(data.propiedad).ubicacion;

     
  });
  this.pagoService.getPagos()
  .subscribe(data => {
    this.pagos = data.filter(data => this.usuarioId === data.usuario);
    this.propiedadId = this.contratoService.getContratoId(data.contrato).propiedad;
   
});

    this.pagos = this.pagoService.guardarDatos().map(pago => {
    return {
      id: pago.id,
      monto: pago.monto,
      honorarios: pago.honorarios,
      punitorios: pago.punitorios,
      fecha_pago: pago.fecha_pago,
      agua: pago.agua,
      luz: pago.luz,
      gas: pago.gas,
      expensas: pago.expensas,
      contrato: pago.contrato,
      usuario: this.usuarioId
    };
    });
    console.log(this.pagos);
  }
  
    


  ionViewDidEnter() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.pagoService.getPagos()
    .subscribe(data => {
      console.log(this.usuarioId);
      this.propiedadNombre = this.propiedadesService.getPropiedadId(data.propiedad).ubicacion;
      this.propiedadId = this.contratoService.getContratoId(data.contrato).propiedad;
      this.pagos = data.filter(data => this.usuarioId === data.usuario);
    });
    this.pagos = this.pagos.map(pago => {
    return {
      id: pago.id,
      monto: pago.monto,
      honorarios: pago.honorarios,
      punitorios: pago.punitorios,
      fecha_pago: pago.fecha_pago,
      agua: pago.agua,
      luz: pago.luz,
      gas: pago.gas,
      expensas: pago.expensas,
      contrato: pago.contrato,
      propiedadName: this.propiedadesService.getPropiedadId(this.contratoService.getContratoId(pago.contrato).propiedad).ubicacion,
      usuario: this.usuarioId
    };
    });
    console.log(this.pagos);
  }

goBack(){
  this.router.navigate(['/detalle_caja']);
}
}
