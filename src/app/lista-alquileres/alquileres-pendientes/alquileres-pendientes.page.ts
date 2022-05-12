import { Component, OnInit } from '@angular/core';
import { PagosService } from 'src/app/pagos/pagos.service';
import { Pago } from 'src/app/pagos/pago.model';
import { ContratosService } from 'src/app/contratos/contratos.service';
import { PropiedadesService } from 'src/app/propiedades/propiedades.service';
import { HomeService } from 'src/app/home/home.service';
import { Contrato } from 'src/app/contratos/contrato.model';

@Component({
  selector: 'app-alquileres-pendientes',
  templateUrl: './alquileres-pendientes.page.html',
  styleUrls: ['./alquileres-pendientes.page.scss'],
})
export class AlquileresPendientesPage implements OnInit {
m: any;
m2: any;
date: any;
anio: any;
pagos: Pago[];
propiedadNombre: any;
propiedadId: any;
usuarioId: any;

  constructor(private homeService: HomeService, private pagoService: PagosService,  private contratosService: ContratosService, private propiedadService: PropiedadesService) { }

  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    function getMes(index){
      const mes = new Array(12);
      mes[0] = 1;
      mes[1] = 2;
      mes[2] = 3;
      mes[3] = 4;
      mes[4] = 5;
      mes[5] = 6;
      mes[6] = 7;
      mes[7] = 8;
      mes[8] = 9;
      mes[9] = 10;
      mes[10] = 11;
      mes[11] = 12;
      return mes[index];
    }
    function getMes2(index){
      const mes = new Array(12);
      mes[0] = 'Enero';
      mes[1] = 'Febrero';
      mes[2] = 'Marzo';
      mes[3] = 'Abril';
      mes[4] = 'Mayo';
      mes[5] = 'Junio';
      mes[6] = 'Julio';
      mes[7] = 'Agosto';
      mes[8] = 'Septiembre';
      mes[9] = 'Octubre';
      mes[10] = 'Noviembre';
      mes[11] = 'Diciembre';
      return mes[index];
    }
    const d = new Date();
    this.m2 = getMes2(d.getMonth());
    this.m = getMes(d.getMonth());
    console.log(this.m);
    this.date = d.getDate();
    this.anio = d.getFullYear();
    this.pagoService.getPagos()
    .subscribe(data => {
      this.pagos = data;
      this.propiedadNombre = this.propiedadService.getPropiedadId(data.propiedad).ubicacion
     
  });
  this.pagoService.getPagos()
  .subscribe(data => {
    this.pagos = data;
    this.propiedadId = this.contratosService.getContratoId(data.contrato).propiedad;
   
});
  }

  ionViewDidEnter(){
        // FILTRO Y MAPEO DE TODOS LOS PAGOS PENDIENTES EN EL MES CORRIENTE
        this.pagoService.getPagos() 
        .subscribe(data => {
          this.pagos = data.filter(data => new Date(data.fecha_pago).getMonth()+1 === this.m && new Date(data.fecha_pago).getFullYear() === this.anio &&  this.usuarioId === data.usuario)
          if(this.pagos.length === 0){
            this.pagos = data.filter(data => new Date(data.fecha_pago).getMonth()+1 < this.m && new Date(data.fecha_pago).getFullYear() === this.anio &&  this.usuarioId === data.usuario);
            this.pagos = this.pagos.map(pago => {
              return {
                id: pago.id,
                monto: pago.monto,
                honorarios: pago.honorarios,
                punitorios: pago.punitorios,
                fecha_pago: pago.fecha_pago,
                agua: pago.agua,
                luz: pago.luz,
                gas: pago.gas,
                expensas: pago.expensas,
                contrato: pago.contrato,
                dia: new Date(pago.fecha_pago).getDate(),
                mes: new Date(pago.fecha_pago).getMonth(),
                year: new Date(pago.fecha_pago).getFullYear(),
                propiedadId: this.contratosService.getContratoId(pago.contrato).propiedad,
                propiedadName: this.propiedadService.getPropiedadId(this.contratosService.getContratoId(pago.contrato).propiedad).ubicacion,
                usuario: pago.usuario
              };
              }); 
            console.log(this.pagos);
            this.pagos = this.pagos.sort(function(a,b){
              return new Date(b.fecha_pago).getTime() - new Date(a.fecha_pago).getTime();
            });
          }
          else{
            console.log("Se encontro pago");
            console.log(this.pagos);
            this.pagos = null;
          }
       
        });
     
      }
}
