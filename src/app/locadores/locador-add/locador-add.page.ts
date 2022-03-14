import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocadoresService } from '../locadores.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/home/home.service';
@Component({
  selector: 'app-locador-add',
  templateUrl: './locador-add.page.html',
  styleUrls: ['./locador-add.page.scss'],
})
export class LocadorAddPage implements OnInit {

  constructor(private homeService: HomeService, private locadorService: LocadoresService, private router: Router, private alertCtrl: AlertController, private formBuilder: FormBuilder) { }
  usuarioId: any;
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
  }

  get nombre() {
    return this.registrationForm.get("nombre");
  }
  get apellido() {
    return this.registrationForm.get("apellido");
  }
  get DNI() {
    return this.registrationForm.get("DNI");
  }
  get CUIT() {
    return this.registrationForm.get("CUIT");
  }
  get telefono() {
    return this.registrationForm.get("telefono");
  }
  get direccion() {
    return this.registrationForm.get("direccion");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get cuenta_bancaria() {
    return this.registrationForm.get("cuenta_bancaria");
  }

  public errorMessages = {
    nombre: [
      { type: 'required', message: 'Nombre es requerido' },
      { type: 'maxlength', message: 'Nombre no puede tener mas de 100 caracteres' }
    ],
    apellido: [
      { type: 'required', message: 'Apellido es requerido' },
      { type: 'maxlength', message: 'Apellido no puede tener mas de 100 caracteres' }
    ],
    DNI: [
      { type: 'required', message: 'DNI es requerido' },
      { type: 'maxlength', message: 'DNI no puede tener mas de 9 caracteres' }
    ],
    CUIT: [
      { type: 'required', message: 'CUIT es requerido' },
      { type: 'pattern', message: 'Ingrese un CUIT valido' }
    ],
    telefono: [
      { type: 'required', message: 'Telefono es requerido' },
      { type: 'pattern', message: 'Ingrese un numero de telefono valido' }
    ],
    direccion: [
      { type: 'required', message: 'Direccion es requerido' },
      { type: 'maxlength', message: 'Direccion no puede tener mas de 100 caracteres' }
    ],
    email: [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese un email valido' }
    ],
    cuenta_bancaria: [
      { type: 'required', message: 'Cuenta bancaria es requerida' },
      { type: 'maxlength', message: 'Cuenta bancaria no puede tener mas de 100 caracteres' }
    ],
  }

  registrationForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    DNI: ['', [Validators.required, Validators.maxLength(12)]],
    CUIT: [
      '',
      [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ]
    ],
    telefono: [
      '',
      [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ]
    ],
    direccion: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    cuenta_bancaria: ['', [Validators.required, Validators.maxLength(100)]],
    usuario: ['']
  });

  public async submit() {
    this.registrationForm.value.usuario = this.usuarioId;
    console.log(this.registrationForm.value);
    this.locadorService.addLocadores(this.registrationForm.value).subscribe(res => {
      alert(res.toString());
  });
  const alertElement = await this.alertCtrl.create({
    header: 'Locador se ha registrado',
    message: 'El locador se ha registrsado con exito',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.router.navigate(['/locadores']);
        }
      }
    ]
  });
  await alertElement.present();
}
}
