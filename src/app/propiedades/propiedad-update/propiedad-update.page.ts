import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HomeService } from 'src/app/home/home.service';
import { LocadoresService } from 'src/app/locadores/locadores.service';
import { PropiedadesService } from '../propiedades.service';

@Component({
  selector: 'app-propiedad-update',
  templateUrl: './propiedad-update.page.html',
  styleUrls: ['./propiedad-update.page.scss'],
})
export class PropiedadUpdatePage implements OnInit {
 

  constructor(private homeService: HomeService,
              private router: Router,
              private activatedRoute: ActivatedRoute, private alertCtrl: AlertController, private formBuilder: FormBuilder, private locadoresService: LocadoresService, private http: HttpClient) { }
              id2: any;
              locadores = [];
              cover: File;
              habilitar: boolean = false;
              cover2: File;
              habilitar2: boolean = false;
              cover3: File;
              habilitar3: boolean = false;
              cover4: File;
              habilitar4: boolean = false;
              usuarioId: any;

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
                usuario: ['']
              });
              public async submit() {
                this.registrationForm.value.usuario = this.usuarioId; 
                const uploadData = new FormData();
                uploadData.append('id', this.id2);
                uploadData.append('ubicacion', this.registrationForm.value.ubicacion);
                uploadData.append('tipo', this.registrationForm.value.tipo);
                uploadData.append('estado', this.registrationForm.value.estado);
                uploadData.append('locador', this.registrationForm.value.locador);
                uploadData.append('inventario', this.registrationForm.value.inventario);
                uploadData.append('usuario', this.registrationForm.value.usuario);
          
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
                this.http.put('http://127.0.0.1:8000/propiedad/' + this.id2, uploadData).subscribe(
                  data => console.log(data),
                  error => console.log(error)
                );
                const alertElement = await this.alertCtrl.create({
                  header: 'Propiedad registrada',
                  message: 'La propieddad se ha registrado con exito',
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
    this.registrationForm.value.usuario = this.usuarioId;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('propiedadId')) {
        // redirect
        this.router.navigate(['/propiedades']);
      }
      const recipeId = paramMap.get('propiedadId');
      this.id2 = recipeId;

    this.locadoresService.getLocadores()
    .subscribe(data => {
      console.log(data);
      this.locadores = data;
    });
  });
}
}
