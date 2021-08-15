import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { InquilinosService } from '../inquilinos.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inquilino-update',
  templateUrl: './inquilino-update.page.html',
  styleUrls: ['./inquilino-update.page.scss'],
})
export class InquilinoUpdatePage implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private inquilinoService: InquilinosService, private router: Router,  private alertCtrl: AlertController, private formBuilder: FormBuilder) { }
  id2: any;
  nombre2: any;
  apellido2: any;
  DNI2: any;
  CUIT2: any;
  telefono2: any;
  direccion2: any;
  email2: any;
  cuenta_bancaria2: any;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('inquilinoId')) {
        // redirect
        this.router.navigate(['/inquilinos']);
      }
      const recipeId = paramMap.get('inquilinoId');
      console.log(recipeId);
      this.id2 = recipeId;
      this.inquilinoService.getInquilino(this.id2).subscribe(data =>{
        this.nombre2 = data.nombre;
        this.apellido2 = data.apellido;
        this.DNI2 = data.DNI;
        this.CUIT2 = data.CUIT;
        this.telefono2 = data.telefono;
        this.direccion2 = data.direccion;
        this.email2 = data.email;
        this.cuenta_bancaria2 = data.cuenta_bancaria;
      })
  });
}

get nombre() {
  if(this.registrationForm.get('nombre') != null)
  {
  return this.registrationForm.get('nombre');
  }
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
  id: [''],
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
  this.registrationForm.value.id = this.id2; 
  this.inquilinoService.updateInquilino(this.registrationForm.value).subscribe(res => {
    alert(res.toString());
});
const alertElement = await this.alertCtrl.create({
  header: 'Inquilino actualizado',
  message: 'El inquilino se ha actualizado con exito',
  buttons: [
    {
      text: 'OK',
      handler: () => {
        this.router.navigate(['/inquilinos']);
      }
    }
  ]
 });
 await alertElement.present();
}
}
