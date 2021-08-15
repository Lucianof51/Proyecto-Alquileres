import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PropiedadesService } from '../propiedades.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from "@angular/forms";
import { LocadoresService } from 'src/app/locadores/locadores.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-propiedad-add',
  templateUrl: './propiedad-add.page.html',
  styleUrls: ['./propiedad-add.page.scss'],
})
export class PropiedadAddPage implements OnInit {
  constructor(private propiedadService: PropiedadesService,
              private router: Router, private alertCtrl: AlertController,
              private formBuilder: FormBuilder, private locadoresService: LocadoresService, private http: HttpClient) { }
              locadores = [];
              cover: File;
              habilitar: boolean = false;
              cover2: File;
              habilitar2: boolean = false;
              cover3: File;
              habilitar3: boolean = false;
              cover4: File;
              habilitar4: boolean = false;

              get ubicacion() {
                return this.registrationForm.get("ubicacion");
              }
              get tipo() {
                return this.registrationForm.get('tipo');
              }

              get locador() {
                return this.registrationForm.get("locador");
              }

              get inventario() {
                return this.registrationForm.get("inventario");
              }
            
        
              public errorMessages = {
                ubicacion: [
                  { type: 'required', message: 'Ubicación es requerida' }
                ],
                tipo: [
                  { type: 'required', message: 'Tipo de propiedad es requerido' }
                ],
                locador: [
                  {type: 'required', message: 'Locador requerido'}
                ],
              };
              registrationForm = this.formBuilder.group({
                ubicacion: ['', [Validators.required]],
                tipo: [
                  '',
                  [
                    Validators.required
                  ]
                ],
                estado: [
                  'Disponible',
                  [
                    Validators.required
                  ]
                ],
                locador: ['', [Validators.required]],
                inventario: [''],
              });
              public async submit() {
               
                const uploadData = new FormData();
                uploadData.append('ubicacion', this.registrationForm.value.ubicacion);
                uploadData.append('tipo', this.registrationForm.value.tipo);
                uploadData.append('estado', this.registrationForm.value.estado);
                uploadData.append('locador', this.registrationForm.value.locador);
                uploadData.append('inventario', this.registrationForm.value.inventario);
          
                if(this.habilitar)
                {
                  uploadData.append('imagen', this.cover, this.cover.name);
                }
                if(this.habilitar2)
                {
                  uploadData.append('imagen2', this.cover2, this.cover2.name);
                }

                if(this.habilitar3)
                {
                  uploadData.append('imagen3', this.cover3, this.cover3.name);
                }
                if(this.habilitar4)
                {
                  uploadData.append('imagen4', this.cover4, this.cover4.name);
                }
                this.http.post('http://127.0.0.1:8000/propiedad', uploadData).subscribe(async res => {
                  alert(res.toString());
                  const alertElement = await this.alertCtrl.create({
                    header: 'Propiedad registrada',
                    message: 'La propiedad se ha registrado con exito',
                    buttons: [
                      {
                        text: 'OK',
                        handler: () => {
                          this.router.navigate(['/propiedades']);
                        }
                      }
                    ]
                  });
                  await alertElement.present();
              },
              async err => {
                const alertElement = await this.alertCtrl.create({
                  header: 'Error al crear propiedad',
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

              onCoverChanged(event: any){
                this.cover = event.target.files[0];
                this.habilitar = true;
              }
              onCoverChanged2(event: any){
                this.cover2 = event.target.files[0];
                this.habilitar2 = true;
              }

              onCoverChanged3(event: any){
                this.cover3 = event.target.files[0];
                this.habilitar3 = true;
              }
              onCoverChanged4(event: any){
                this.cover4 = event.target.files[0];
                this.habilitar4 = true;
              }
  ngOnInit() {
    this.locadoresService.getLocadores()
    .subscribe(data => {
      console.log(data);
      this.locadores = data;
    });
  }
  
}
