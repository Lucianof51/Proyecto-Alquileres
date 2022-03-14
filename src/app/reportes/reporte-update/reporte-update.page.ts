import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PropiedadesService } from 'src/app/propiedades/propiedades.service';
import { ProveedoresService } from 'src/app/proveedores/proveedores.service';
import { ReporteService } from '../reporte.service';
import { HttpClient} from '@angular/common/http';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-reporte-update',
  templateUrl: './reporte-update.page.html',
  styleUrls: ['./reporte-update.page.scss'],
})
export class ReporteUpdatePage implements OnInit {
  propiedades = [];
  proveedores = [];
  habilitar: boolean = false;
  cover: File;
  usuarioId: any;
  constructor(private homeService: HomeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private propiedadesService: PropiedadesService,
              private proveedorService: ProveedoresService,
              private alertCtrl: AlertController,
              private http: HttpClient) { }

id2: any;
ngOnInit() {
this.usuarioId = this.homeService.setUsuarioId();
this.propiedadesService.getPropiedades()
  .subscribe(data => {
  this.propiedades = data;
  });
this.proveedorService.getProveedores()
  .subscribe(data => {
  this.proveedores = data;
  });
this.activatedRoute.paramMap.subscribe(paramMap => {
if (!paramMap.has('reporteId')) {
// redirect
this.router.navigate(['/reportes']);
}
const recipeId = paramMap.get('reporteId');
this.id2 = recipeId;
});
}

onCoverChanged(event: any){
  this.cover = event.target.files[0];
  this.habilitar = true;
}

// tslint:disable-next-line:max-line-length
  async saveNewReporte(descripcion2: HTMLInputElement, estado2: HTMLInputElement, fecha2: HTMLInputElement, proveedor2: HTMLInputElement, propiedad2: HTMLInputElement, costo2){
const descripcion = descripcion2.value;
const estado = estado2.value;
const fecha = fecha2.value;
const proveedor = proveedor2.value;
const propiedad = propiedad2.value;
const id = this.id2;
const costo = costo2.value;
const usuario = this.usuarioId;
const uploadData = new FormData();
uploadData.append('id', id);
uploadData.append('descripcion', descripcion);
uploadData.append('estado', estado);
uploadData.append('fecha', fecha);
uploadData.append('proveedor', proveedor);
uploadData.append('propiedad', propiedad);
uploadData.append('costo', costo);
if(this.habilitar)
{
  uploadData.append('cover', this.cover, this.cover.name);
}
uploadData.append('usuario', usuario);
this.http.put('http://127.0.0.1:8000/reporteprueba/' + id, uploadData).subscribe(
  data => console.log(data),
  error => console.log(error)
);
const alertElement = await this.alertCtrl.create({
  header: 'Reporte actualizado',
  message: 'El reporte se ha actualizado con exito',
  buttons: [
    {
      text: 'OK',
      handler: () => {
        this.router.navigate(['/reportes']);
      }
    }
  ]
 });
 await alertElement.present();
}
}
