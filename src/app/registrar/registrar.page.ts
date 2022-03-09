import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarService } from './registrar.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor(private registrarService: RegistrarService, private router: Router, private alertCtrl: AlertController, private formBuilder: FormBuilder) { }

  ngOnInit() {
 
  }

  get nombre() {
    return this.registrationForm.get("nombre");
  }
  get apellido() {
    return this.registrationForm.get("apellido");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
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
    email: [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese un email valido' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida' },
      { type: 'minlength', message: 'La contraseña debe tener 4 o más caracteres' }
    ],
  }

  registrationForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%-]{4,20}')
      ]
    ],
   
  });

  public async submit() {
    console.log(this.registrationForm.value);
    this.registrarService.addRegistro(this.registrationForm.value).subscribe(async res => {
      const alertElement = await this.alertCtrl.create({
        header: 'Cuenta registrada',
        message: 'Se ha registrado la cuenta con éxito',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }
        ]
      });
      await alertElement.present();
    },
      async error => { const alertElement = await this.alertCtrl.create({
  header: 'Error al crear cuenta',
  message: 'El email ya está vinculado a una cuenta',
  buttons: [
    {
      text: 'OK',
    }
  ]
});
await alertElement.present();
})
}
}
