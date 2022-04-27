import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contrato } from 'src/app/contratos/contrato.model';
import { ContratosService } from 'src/app/contratos/contratos.service';
import { HomeService } from 'src/app/home/home.service';
import { PagosService } from 'src/app/pagos/pagos.service';
import { PropiedadesService } from 'src/app/propiedades/propiedades.service';
import { ReporteService } from 'src/app/reportes/reporte.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
})
export class MovimientosPage implements OnInit {
  movimientos = [];
  pagos = [];
  contratoId: any;
  contratos: Contrato[];
  reportes = [];
  reporteId: any;
  propiedadId: any;
  movimientos2 = []
  usuarioId: any;
  constructor(private homeService: HomeService, private pagoService: PagosService, private reporteService: ReporteService,
              private propiedadService: PropiedadesService, private contratoService: ContratosService, private router: Router) { }

  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.reporteService.getReportes()
    .subscribe(reporte => {
      this.reportes = reporte.filter(reporte => this.usuarioId === reporte.usuario);
        this.movimientos = this.reportes.map(reporte => {
          return {
            id: reporte.id,
            fechaPago: reporte.fecha,
            costo: reporte.costo
          }     
         });

    this.pagoService.getPagos()
    .subscribe(pago => {
      this.pagos = pago.filter(pago => this.usuarioId === pago.usuario);
        this.movimientos2 = this.pagos.map(pago => {
          return {
            id2: pago.id,
            fechaPago: pago.fecha_pago,
            monto: pago.monto,
            contrato: pago.contrato
          }
        });
     
    console.log(this.movimientos);
    console.log(this.movimientos2);
    this.movimientos = this.movimientos.concat(this.movimientos2);
    this.movimientos = this.movimientos.sort(function(a,b){
    return  new Date(b.fechaPago).getTime() - new Date(a.fechaPago).getTime();
    });
    console.log(this.movimientos);
    });
  });
  }

  mostrarPago(pagoId, contrato){
    console.log(pagoId);
    this.router.navigate(['pagos', contrato, pagoId]);
  }

  mostrarReporte(reporteId)
  {
    this.router.navigate(['/reportes', reporteId]);
  }
}