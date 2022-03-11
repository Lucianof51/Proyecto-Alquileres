import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratosService } from '../contratos/contratos.service';
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
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private pagoService: PagosService, private router: Router) {

  }

  ngOnInit() {
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
    });
      this.pagoService.guardarDatos();
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
    this.router.navigate(['/home']);
  }

  updatePagos(pagoId){
    this.router.navigate(['/pago-update', this.id, pagoId]);
    }
  verPagos(pagoId, contratoId){
    contratoId= this.id;
    this.router.navigate(['/pagos', contratoId, pagoId]);
    }
  doRefresh(event) {
      console.log('Begin async operation');
      this.pagoService.getPagos()
      .subscribe(data => {
        console.log(data);
        this.pagos = data;
      });
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
}
