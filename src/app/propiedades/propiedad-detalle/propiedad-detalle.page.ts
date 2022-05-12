import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Propiedad } from '../propiedad.model';
import { AlertController } from '@ionic/angular';
import { PropiedadesService } from '../propiedades.service';
import { ThrowStmt } from '@angular/compiler';
import { ContratosService } from 'src/app/contratos/contratos.service';
import { Contrato } from 'src/app/contratos/contrato.model';
import { Observable } from 'rxjs';
import { LocadoresService } from 'src/app/locadores/locadores.service';
import { Persona } from 'src/app/persona.model';

@Component({
  selector: 'app-propiedad-detalle',
  templateUrl: './propiedad-detalle.page.html',
  styleUrls: ['./propiedad-detalle.page.scss'],
})
export class PropiedadDetallePage implements OnInit {
  propiedades: Propiedad;
  contratos: Contrato;
  locador: Persona;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private propiedadService: PropiedadesService, private router: Router, private alertCtrl: AlertController, private contratoService: ContratosService, private locadorService: LocadoresService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('propiedadId')) {
        // redirect
        this.router.navigate(['/propiedades']);
      }
      const recipeId = paramMap.get('propiedadId');
      console.log(recipeId);
      this.propiedadService.getPropiedad(recipeId)
    .subscribe(data => {
      this.propiedades = data;
      console.log(this.propiedades);
          this.contratos = this.contratoService.getContratoPropiedad(this.propiedades.id);
          this.locadorService.getLocador(data.locador).subscribe(loc => {
            this.locador = loc;
          })
    });
    });
  }

  ionViewDidEnter(){
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('propiedadId')) {
        // redirect
        this.router.navigate(['/propiedades']);
      }
      const recipeId = paramMap.get('propiedadId');
      console.log(recipeId);
      this.propiedadService.getPropiedad(recipeId)
    .subscribe(data => {
      this.propiedades = data;
      console.log(this.propiedades);
          this.contratos = this.contratoService.getContratoPropiedad(this.propiedades.id);
          this.locadorService.getLocador(data.locador).subscribe(loc => {
            this.locador = loc;
          })
    });
    });
  }
  async deletePlace(){
  const alertElement = await this.alertCtrl.create({
    header: 'Estas seguro de querer eliminar',
    
    buttons: [
      {
       text: 'Cancel',
       role: 'cancel'
      },
      {
        text: 'Delete',
        handler: async () => {
          if (this.propiedades.estado == "Disponible"){
            this.propiedadService.deletePropiedad(this.propiedades.id);
            this.router.navigate(['/propiedades']);
          }
          else{
            console.log("Esta propiedad no se puede eliminar");
            const alertElement = await this.alertCtrl.create({
              header: 'Esta propiedad no puede ser eliminada porque está sujeta a un contrato',
              
              buttons: [
                {
                 text: 'OK',
                 role: 'cancel'
                },
              ]
            });
            await alertElement.present();

          }
        }
      }
    ]
  });
  await alertElement.present();
}
gotoAlquileres() {
  this.router.navigate(['/contratos', this.contratoService.getContratoPropiedad(this.propiedades.id).id]);

}

}
