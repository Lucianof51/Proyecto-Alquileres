import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GarantesService } from '../garantes.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-garante-add',
  templateUrl: './garante-add.page.html',
  styleUrls: ['./garante-add.page.scss'],
})
export class GaranteAddPage implements OnInit {

  constructor(private garanteService: GarantesService, private router: Router, private alertCtrl: AlertController, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
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
    cuenta_bancaria: ['', [Validators.required, Validators.maxLength(100)]]
  });

  public async submit() {
    console.log(this.registrationForm.value);
    this.garanteService.addGarante(this.registrationForm.value).subscribe(res => {
      alert(res.toString());
  });
  const alertElement = await this.alertCtrl.create({
    header: 'Garante registrado',
    message: 'El garante se ha registrado con exito',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.router.navigate(['/garantes']);
        }
      }
    ]
  });
  await alertElement.present();
  }
}
