import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvisoService } from './aviso.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { InquilinosService } from '../inquilinos/inquilinos.service';
import { LocadoresService } from '../locadores/locadores.service';
import { GarantesService } from '../garantes/garantes.service';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.page.html',
  styleUrls: ['./aviso.page.scss'],
})
export class AvisoPage implements OnInit {

  avisos = [];
  subject='';
  body='';
  to='';
  
  constructor(private avisoService: AvisoService,
    // tslint:disable-next-line:align
    private router: Router, public EmailComposer: EmailComposer, private inquilinoService: InquilinosService,
    private locadorService: LocadoresService, private garanteService: GarantesService) { }

    inquilinos = [];
    locadores = [];
    garantes = [];
    emailsloc= [];
    emailsinq = [];
    emailsgar = [];
    Enviar() {
      this.EmailComposer.open({
       to: this.to,
       cc: [],
       bcc: [],
       subject: this.subject,
       body: this.body,
       isHtml: false,
       app: 'gmail'
      }) 
     }
     

     
  ngOnInit() {
    this.inquilinoService.getInquilinos()
    .subscribe(inquilino => {
      this.inquilinos = inquilino;
      this.emailsinq = this.inquilinos.map(inquilino => {
        return {
          nombre: inquilino.nombre,
          apellido: inquilino.apellido,
          email: inquilino.email

        }
      });

      this.locadorService.getLocadores()
      .subscribe(locador => {
        this.locadores = locador;
        this.emailsloc = this.locadores.map(locador => {
          return {
            nombre: locador.nombre,
            apellido: locador.apellido,
            email: locador.email
          }
        });
        this.garanteService.getGarantes()
        .subscribe(garante => {
          this.garantes = garante;
          this.emailsgar = this.garantes.map(garante => {
            return {
              nombre: garante.nombre,
              apellido: garante.apellido,
              email: garante.email
            }
          });
          this.emailsinq = this.emailsinq.concat(this.emailsloc, this.emailsgar);
          console.log(this.emailsinq);
      });
    });
  });
  }


  addNewAviso(){
    this.router.navigate(['/aviso-add']);
  }

  updateAviso(avisoId){
    this.router.navigate(['/aviso-update', avisoId]);
    }

  verAviso(avisoId){
    this.router.navigate(['/avisos', avisoId]);
    }

}
