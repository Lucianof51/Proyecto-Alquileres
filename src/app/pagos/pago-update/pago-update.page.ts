import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HomeService } from 'src/app/home/home.service';
import { Pago } from '../pago.model';
import { PagosService } from '../pagos.service';

@Component({
  selector: 'app-pago-update',
  templateUrl: './pago-update.page.html',
  styleUrls: ['./pago-update.page.scss'],
})
export class PagoUpdatePage implements OnInit {

  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute, private router: Router,private pagoService: PagosService,private alertCtrl: AlertController) { }
  pago: Pago;
  id: any;
  usuarioId: any;
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pagoId')) {
        // redirect
        this.router.navigate(['/pago-update']);
      }
      const recipeId = paramMap.get('pagoId');
      console.log(recipeId);
      this.id = recipeId;
      this.pagoService.getPago(recipeId)
    .subscribe(data => {
      this.pago = data;
      console.log(this.pago);
    });
    });
  }
  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pagoId')) {
        // redirect
        this.router.navigate(['/pago-update']);
      }
      const recipeId = paramMap.get('pagoId');
      console.log(recipeId);
      this.id = recipeId;
      this.pagoService.getPago(recipeId)
    .subscribe(data => {
      this.pago = data;
      console.log(this.pago);
    });
    });
  }

  async saveNewPago(monto2, honorarios2, punitorios2: HTMLInputElement,
    // tslint:disable-next-line:variable-name
              fecha_pago2: HTMLInputElement, agua2,  luz2: HTMLInputElement, gas2: HTMLInputElement,
              expensas2: HTMLInputElement){
  const id = this.id;
  const monto = monto2.value;
  // tslint:disable-next-line:no-unused-expression
  const honorarios = (monto2.value * honorarios2.value) / 100;
  const punitorios = punitorios2.value;
  // tslint:disable-next-line:variable-name
  const fecha_pago = fecha_pago2.value;
  const usuario = this.usuarioId; 
  let agua = agua2.value;
  if (agua === ''){
    agua = null;
    }
    else{
      agua = agua2.value;
    }
  let luz = luz2.value;
  if (luz === ''){
      luz = null;
      }
      
  let gas = gas2.value;
  if (gas === ''){
    gas = null;
    }
  let expensas = expensas2.value;
  if (expensas === ''){
    expensas = null;
    }

  const contrato = this.pago.contrato;
  const val = {
    id,
    monto,
    honorarios,
    punitorios,
    fecha_pago,
    agua,
    luz,
    gas,
    expensas,
    contrato,
    usuario
  };
  this.pagoService.updatePago(val).subscribe(async res => {
    alert(res.toString());
    const alertElement = await this.alertCtrl.create({
      header: 'Pago actualizado',
      message: 'Tu pago se ha actualizado con exito',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/pagos', this.pago.contrato]);
          }
        }
      ]
    });
    await alertElement.present();
  },
  async err => {
    const alertElement = await this.alertCtrl.create({
      header: 'Error al actualizar pago',
      message: 'No ha ingresado los datos correctos',
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    await alertElement.present();
  }
  );
  
  }
}