import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ContratosService } from '../contratos.service';
import { GarantesService } from 'src/app/garantes/garantes.service';
import { PropiedadesService } from 'src/app/propiedades/propiedades.service';
import { LocadoresService } from 'src/app/locadores/locadores.service';
import { InquilinosService } from 'src/app/inquilinos/inquilinos.service';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-contrato-update',
  templateUrl: './contrato-update.page.html',
  styleUrls: ['./contrato-update.page.scss'],
})
export class ContratoUpdatePage implements OnInit {
  

  constructor(private homeService: HomeService, private garantesService: GarantesService, private propiedadesService: PropiedadesService,
    private locadoresService: LocadoresService, private contratoService: ContratosService,
    private inquilinosService: InquilinosService,
    private activatedRoute: ActivatedRoute, private contratosService: ContratosService, private router: Router, private alertCtrl: AlertController, private formBuilder: FormBuilder) { }

  id2: any;
  valor2: any;
  honorarios2: any;
  fecha_ingreso2: any;
  fecha_egreso2: any;
  fecha_rescision2: any;
  tipo_contrato2: any;
  vencimiento_pago2: any;
  propiedad2: any;
  locador2: any;
  inquilino2: any;
  garante2: any;
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
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('contratoId')) {
        // redirect
        this.router.navigate(['/contratos']);
      }
      const recipeId = paramMap.get('contratoId');
      this.id2 = recipeId;
      this.contratosService.getContrato(this.id2).subscribe(data =>{
        this.valor2 = data.valor;
        this.honorarios2 = data.honorarios;
        this.fecha_ingreso2 = data.fecha_ingreso;
        this.fecha_egreso2 = data.fecha_egreso;
        this.fecha_rescision2 = data.fecha_rescision;
        this.tipo_contrato2 = data.tipo_contrato;
        this.vencimiento_pago2 = data.vencimiento_pago;
        this.propiedad2 = data.propiedad;
        this.locador2 = data.locador;
        this.inquilino2 = data.inquilino;
        this.garante2 = data.garante;
      })
  });
  }
  get valor() {
    if(this.registrationForm.get('valor') != null)
    {
    return this.registrationForm.get('valor');
    }
  }

  get honorarios() {
      if(this.registrationForm.get('honorarios') != null)
      {
      return this.registrationForm.get('honorarios');
      }
    }

  get fecha_ingreso() {
    if(this.registrationForm.get('fecha_ingreso') != null)
    {
    return this.registrationForm.get('fecha_ingreso');
    }
  }

  get fecha_egreso() {
    if(this.registrationForm.get('fecha_egreso') != null)
    {
    return this.registrationForm.get('fecha_egreso');
    }
  }
  
  get fecha_rescision() {
    if(this.registrationForm.get('fecha_rescision') != null)
    {
    return this.registrationForm.get('fecha_rescision');
    }
  }

  get tipo_contrato() {
    if(this.registrationForm.get('tipo_contrato') != null)
    {
    return this.registrationForm.get('tipo_contrato');
    }
  }

  get vencimiento_pago() {
    if(this.registrationForm.get('vencimiento_pago') != null)
    {
    return this.registrationForm.get('vencimiento_pago');
    }
  }

  get propiedad() {
    if(this.registrationForm.get('propiedad') != null)
    {
    return this.registrationForm.get('propiedad');
    }
  }

  get locador() {
    if(this.registrationForm.get('locador') != null)
    {
    return this.registrationForm.get('locador');
    }
  }
  get inquilino() {
    if(this.registrationForm.get('inquilino') != null)
    {
    return this.registrationForm.get('inquilino');
    }
  }

  get garante() {
    if(this.registrationForm.get('garante') != null)
    {
    return this.registrationForm.get('garante');
    }
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
    fecha_ingreso: ['', [Validators.required]],
    fecha_egreso: ['', [Validators.required]],
    fecha_rescision: [''],
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
    console.log(this.usuarioId);
    if (this.registrationForm.value.punitorios == ''){
      this.registrationForm.value.punitorios = null;
    }
    this.registrationForm.value.id = this.id2; 
    this.registrationForm.value.usuario = this.usuarioId;
    this.contratosService.updateContrato(this.registrationForm.value).subscribe(res => {
      alert(res.toString());
  });
    const alertElement = await this.alertCtrl.create({
      header: 'Contrato actualizado',
      message: 'Tu contrato se ha actualizado con exito',
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
  }

}
