import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratosService } from 'src/app/contratos/contratos.service';
import { PagosService } from '../pagos.service';
import { AlertController } from '@ionic/angular';
import { HomeService } from 'src/app/home/home.service';
@Component({
  selector: 'app-pago-add',
  templateUrl: './pago-add.page.html',
  styleUrls: ['./pago-add.page.scss'],
})
export class PagoAddPage implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private homeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute, private contratoService: ContratosService, private pagoService: PagosService, private alertCtrl: AlertController) { }
  id: any;
  usuarioId: any;
  contratos = [];
  state = { checked: ''};
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
     this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pagoId')) {
        // redirect
        this.router.navigate(['/home']);
      }
      const recipeId = paramMap.get('pagoId');
      this.id = recipeId;
      this.contratoService.getContratos()
      .subscribe(data => {
      console.log(data);
      this.contratos = data;
      });
    });
  }

  checkbox(e) {
    e = false;
    console.log(e);
  }
  setState(arg0: { input: any; }) {
    throw new Error('Method not implemented.');
  }
public saveNewPago(monto2, honorarios2, punitorios2: HTMLInputElement,
    // tslint:disable-next-line:variable-name
              fecha_pago2: HTMLInputElement, agua2,  luz2: HTMLInputElement, gas2: HTMLInputElement,
              expensas2: HTMLInputElement, tasas11desc: HTMLInputElement, tasas11, tasas22desc: HTMLInputElement, tasas22, tasas33desc: HTMLInputElement, tasas33,
              tasas44desc: HTMLInputElement, tasas44){
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
   

        let tasas1desc = tasas11desc.value;
        if (tasas1desc === ''){
          tasas1desc = null;
          }
      
          let tasas1 = tasas11.value;
        if (tasas1 === ''){
          tasas1 = null;
          }
        

          let tasas2desc = tasas22desc.value;
          if (tasas2desc === ''){
            tasas2desc = null;
          }
            let tasas2 = tasas22.value;
          if (tasas2 === ''){
            tasas2 = null;
            }
         

            let tasas3desc = tasas33desc.value;
            if (tasas3desc === ''){
              tasas3desc = null;
              }
          
              let tasas3 = tasas33.value;
            if (tasas3 === ''){
              tasas3 = null;
              }

              let tasas4desc = tasas44desc.value;
              if (tasas4desc === ''){
                tasas4desc = null;
                }
            
                let tasas4 = tasas44.value;
              if (tasas4 === ''){
                tasas4 = null;
                }
            
  /*const tasas1descripcion = tasas11desc.value;
  const tasas1 = tasas11;
  const tasas2descripcion = tasas22desc.value;
  const tasas2 = tasas22;
  const tasas3descripcion = tasas33desc.value;
  const tasas3 = tasas33;
  */
  const contrato = this.id;
  const val = {
    monto,
    honorarios,
    punitorios,
    fecha_pago,
    agua,
    luz,
    gas,
    expensas,
    tasas1desc,
    tasas1,
    tasas2desc,
    tasas2,
    tasas3desc,
    tasas3,
    tasas4desc,
    tasas4,
    contrato,
    usuario
  };
  this.pagoService.addPago(val).subscribe(async res => {
    alert(res.toString());
    const alertElement = await this.alertCtrl.create({
      header: 'Pago registrado',
      message: 'Tu pago se ha registrado con exito',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/pagos', this.id]);
          }
        }
      ]
    });
    await alertElement.present();
  },
  async err => {
    const alertElement = await this.alertCtrl.create({
      header: 'Error al agregar pago',
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
