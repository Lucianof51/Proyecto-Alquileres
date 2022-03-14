import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { Reporte } from './reporte.model';
import { ReporteService } from './reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  reportes: Reporte[];
  title: string;
  cover: File;
  usuarioId: any;
  constructor(private homeService: HomeService, private reporteService: ReporteService,
    // tslint:disable-next-line:align
    private router: Router, private http: HttpClient) { }

 
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.reporteService.getReportes()
    .subscribe(data => {
      this.reportes = data.filter(data => this.usuarioId === data.usuario);
      this.reportes = this.reportes.map(rep =>{
        return {
          id: rep.id,
          descripcion: rep.descripcion,
          estado: rep.estado,
          fecha: rep.fecha,
          proveedor: rep.proveedor,
          propiedad: rep.propiedad,
          costo: rep.costo,
          imagenDamage: rep.imagenDamage
        };
      });
  });
  }


  addNewReporte(){
    this.router.navigate(['/reporte-add']);
  }

  updateReporte(reporteId){
    this.router.navigate(['/reporte-update', reporteId]);
    }

  verReporte(reporteId){
    this.router.navigate(['/reportes', reporteId]);
    }
  doRefresh(event) {
      console.log('Begin async operation');
      this.usuarioId = this.homeService.setUsuarioId();
      this.reporteService.getReportes()
      .subscribe(data => {
        this.reportes = data.filter(data => this.usuarioId === data.usuario);
        this.reportes = this.reportes.map(rep =>{
          return {
            id: rep.id,
            descripcion: rep.descripcion,
            estado: rep.estado,
            fecha: rep.fecha,
            proveedor: rep.proveedor,
            propiedad: rep.propiedad,
            costo: rep.costo,
            imagenDamage: rep.imagenDamage
          };
        });
    });
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }

}
