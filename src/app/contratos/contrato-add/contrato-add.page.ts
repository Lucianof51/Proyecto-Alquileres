import { Component, OnInit } from '@angular/core';
import { InquilinosService } from 'src/app/inquilinos/inquilinos.service';
import { LocadoresService } from 'src/app/locadores/locadores.service';
import { GarantesService } from '../../garantes/garantes.service';
import {PropiedadesService} from '../../propiedades/propiedades.service';
import {ContratosService} from '../contratos.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-contrato-add',
  templateUrl: './contrato-add.page.html',
  styleUrls: ['./contrato-add.page.scss'],
})
export class ContratoAddPage implements OnInit {

  constructor(private homeService: HomeService, private garantesService: GarantesService, private propiedadesService: PropiedadesService,
              private locadoresService: LocadoresService, private contratoService: ContratosService,
              private inquilinosService: InquilinosService,
              private activatedRoute: ActivatedRoute, private router: Router, private alertCtrl: AlertController, private formBuilder: FormBuilder) { }
  propiedades = [];
  garantes = [];
  locadores = [];
  inquilinos = [];
  usuarioId: any;

  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.propiedadesService.getPropiedades()
      .subscribe(data => {
      console.log(data);
      this.propiedades = data;
      });

    this.locadoresService.getLocadores()
      .subscribe(data => {
        console.log(data);
        this.locadores = data;
      });

    this.inquilinosService.getInquilinos()
        .subscribe(data => {
          console.log(data);
          this.inquilinos = data;
        });

    this.garantesService.getGarantes()
    .subscribe(data => {
      console.log(data);
      this.garantes = data;
    });
  }

  get valor() {
    return this.registrationForm.get("valor");
  }
  get honorarios() {
    return this.registrationForm.get("honorarios");
  }
  get punitorios() {
    return this.registrationForm.get("punitorios");
  }
  get fecha_ingreso() {
    return this.registrationForm.get("fecha_ingreso");
  }
  
  get fecha_egreso() {
    return this.registrationForm.get("fecha_egreso");
  }
  
  get fecha_rescision() {
    return this.registrationForm.get("fecha_rescision");
  }
  get tipo_contrato() {
    return this.registrationForm.get("tipo_contrato");
  }
  get vencimiento_pago() {
    return this.registrationForm.get("vencimiento_pago");
  }
  get propiedad() {
    return this.registrationForm.get("propiedad");
  }

  get locador() {
    return this.registrationForm.get("locador");
  }

  get inquilino() {
    return this.registrationForm.get("inquilino");
  }

  get garante() {
    return this.registrationForm.get("garante");
  }

  public errorMessages = {
    valor: [
      {type: 'required', message: 'Valor requerido'},
      { type: 'pattern', message: 'Ingrese un valor valido' }
    ],
    honorarios: [
      {type: 'required', message: 'Honorarios requerido'},
      { type: 'pattern', message: 'Ingrese un valor valido' }
    ],
    punitorios: [
      { type: 'pattern', message: 'Ingrese un valor valido' }
    ],
    fecha_ingreso: [
      {type: 'required', message: 'Fecha de ingreso requerida'},
    ],
    fecha_egreso: [
      {type: 'required', message: 'Fecha de egreso requerida'},
    ],
    vencimiento_pago: [
      {type: 'required', message: 'Ingrese el dia del vencimiento de pago'},
      { type: 'pattern', message: 'Ingrese un valor valido' }
    ],
    propiedad: [
      {type: 'required', message: 'Propiedad requerida'}
    ],
    locador: [
      {type: 'required', message: 'Locador requerido'}
    ],
    inquilino: [
      {type: 'required', message: 'Inquilino requerido'}
    ],
    garante: [
      {type: 'required', message: 'Garante requerido'}
    ]

  }

  registrationForm = this.formBuilder.group({
    valor: ['', 
    [
      Validators.required,
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
    ]],
    honorarios: ['', 
    [
      Validators.required,
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
    ]],
    punitorios: ['', 
    [
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
    ]],
    fecha_ingreso: ['', [Validators.required]],
    fecha_egreso: ['', [Validators.required]],
    fecha_rescision: [null],
    tipo_contrato: [''],
    vencimiento_pago: ['',  [
      Validators.required,
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
    ]],
    propiedad: ['', [Validators.required]],
    locador: ['', [Validators.required]],
    inquilino: ['', [Validators.required]],
    garante: ['', [Validators.required]],
    usuario: ['']
  });

  public async submit() {
    if (this.registrationForm.value.punitorios == ''){
      this.registrationForm.value.punitorios = null;
    }
    this.registrationForm.value.usuario = this.usuarioId;
    this.contratoService.addContrato(this.registrationForm.value).subscribe(async res => {
      alert(res.toString());
      this.propiedadesService.getPropiedad(this.registrationForm.value.propiedad).subscribe(data => {
        data.estado = 'En alquiler';  
        this.propiedadesService.updatePropiedad(data).subscribe(res => {
          alert(res.toString());
        });
      });
      const alertElement = await this.alertCtrl.create({
        
        header: 'Contrato creado',
        message: 'Tu contrato se ha generado con exito',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/contratos']);
            }
          }
        ]
      });
      await alertElement.present();
  },
  async err => {
    const alertElement = await this.alertCtrl.create({
      header: 'Error al crear contrato',
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
