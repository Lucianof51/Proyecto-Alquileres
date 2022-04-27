import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratosService } from '../contratos/contratos.service';
import { HomeService } from '../home/home.service';
import { Pago } from './pago.model';
import { PagosService } from './pagos.service';


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  pagos: Pago[];
  id: any;
  usuarioId: any;
  // tslint:disable-next-line:max-line-length
  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute, private pagoService: PagosService, private router: Router) {

  }

  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('contratoId')) {
        // redirect
        this.router.navigate(['/home']);
      }
      const recipeId = paramMap.get('contratoId');
      this.id = recipeId;
      this.pagoService.getPagos()
    .subscribe(data => {
      this.pagos = data;
      this.pagos = this.pagoService.getPagoContrato(this.id);
      this.pagos = data.filter(data => this.usuarioId === data.usuario && this.id == data.id);
      this.pagos = this.pagos.map(pago =>{
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
        usuario: pago.usuario
        };
      });
  });
  });
}

  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('contratoId')) {
        // redirect
        this.router.navigate(['/home']);
      }
      const recipeId = paramMap.get('contratoId');
      this.id = recipeId;
      this.pagoService.getPagos()
    .subscribe(data => {
      this.pagos = this.pagoService.getPagoContrato(this.id);
    });
      this.pagoService.guardarDatos();
  });
  }

  addNewPago(pagoId){
    pagoId = this.id;
    this.router.navigate(['/pago-add', pagoId]);
  }

  goToHome() {
    this.router.navigate(['/home', this.usuarioId]);
  }

  updatePagos(pagoId){
    this.router.navigate(['/pago-update', this.id, pagoId]);
    }
  verPagos(pagoId, contratoId){
    contratoId= this.id;
    this.router.navigate(['/pagos', contratoId, pagoId]);
    }
  doRefresh(event) {
    this.usuarioId = this.homeService.setUsuarioId();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('contratoId')) {
        // redirect
        this.router.navigate(['/home', this.usuarioId]);
      }
      const recipeId = paramMap.get('contratoId');
      this.id = recipeId;
      this.pagoService.getPagos()
    .subscribe(data => {
      this.pagos = data;
      this.pagos = this.pagoService.getPagoContrato(this.id);
      this.pagos = data.filter(data => this.usuarioId === data.usuario && this.id == data.id);
      this.pagos = this.pagos.map(pago =>{
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
        usuario: pago.usuario
        };
      });
  });
  });
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
}
