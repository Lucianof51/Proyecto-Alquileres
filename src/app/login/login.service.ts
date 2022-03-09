import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as internal from 'events';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Usuario } from './usuario.model';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: Usuario[];
  email: any;
  readonly APIurl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient, private router: Router, private alertCtrl: AlertController, public loadingController: LoadingController) { }
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  getUsuarios(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/login?format=json', { headers: this.httpHeaders });

  }
  guardarDatos(){
    this.getUsuarios().subscribe(data => {
     this.usuario = data;
    });
    return this.usuario;
  }
  public getUsuario(email: EmailComposer, password: any): Usuario{
    this.usuario = this.guardarDatos();
    return this.guardarDatos().find(item => {if(item.email===email && item.password === password){ this.router.navigateByUrl('/home')
    .then(() => {
      window.location.reload();
    });
    return item.email === email, item.password === password}
    else{
      const alertElement =  this.alertCtrl.create({
        header: 'Error al iniciar sesión',
        message: 'Email y/o contraseña incorrectos',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
  }
});
  }

    /*const found = this.guardarDatos().find(async item => { 
      if(item.email === email)
     {
      this.router.navigateByUrl('/home')
      .then(() => {
        window.location.reload();
      });
      
    }
      else{
        const alertElement = await this.alertCtrl.create({
          header: 'Error al iniciar sesión',
          message: 'Email y/o contraseña incorrectos',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        await alertElement.present();
      }});
      console.log(found);
      return found;
  }*/
}
