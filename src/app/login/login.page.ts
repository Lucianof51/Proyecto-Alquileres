import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './usuario.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 usuario : Usuario;
 email2: any;
  constructor(private loginService: LoginService, private router: Router, private alertCtrl: AlertController, private formBuilder: FormBuilder) { }

  ionViewDidEnter(){
    this.loginService.getUsuarios().subscribe(data => {
    this.loginService.getUsuario(this.registrationForm.value.email, this.registrationForm.value.password);
  });
}
  ngOnInit() {
  }

  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }

  public errorMessages = {
    email: [
      { type: 'pattern', message: 'Ingrese un email valido' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida' },
      { type: 'minlength', message: 'La contraseña debe tener 4 o más caracteres' }
    ],
  }

  registrationForm = this.formBuilder.group({
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

  login(){
 
  this.loginService.getUsuarios().subscribe(async data => {
  this.usuario = this.loginService.getUsuario(this.registrationForm.value.email, this.registrationForm.value.password);
  if (this.usuario == undefined){
    const alertElement =  await this.alertCtrl.create({
      header: 'Error al iniciar sesión',
      message: 'Email y/o contraseña incorrectos',
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    await alertElement.present();
  }
  console.log(this.usuario);
  });
}
  registrar(){
    this.router.navigateByUrl('/registrar')
    .then(() => {
      window.location.reload();
  });
}
}

