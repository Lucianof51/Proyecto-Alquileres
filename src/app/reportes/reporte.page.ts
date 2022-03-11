import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from './reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  reportes = [];
  title: string;
  cover: File;
  constructor(private reporteService: ReporteService,
    // tslint:disable-next-line:align
    private router: Router, private http: HttpClient) { }

 
  ngOnInit() {
    this.reporteService.getReportes()
    .subscribe(data => {
      this.reportes = data;
      console.log(this.reportes);
    });
  }

  ionViewWillEnter() {
   // this.propiedades = this.propiedadService.getPropiedades();
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
      this.reporteService.getReportes()
      .subscribe(data => {
        console.log(data);
        this.reportes = data;
      });
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }

}
