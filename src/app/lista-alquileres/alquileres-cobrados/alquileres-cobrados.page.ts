import { Component, OnInit } from '@angular/core';
import { AvisoService } from 'src/app/avisos/aviso.service';
import { Prueba } from 'src/app/avisos/fechasPrueba.model';
import { Contrato } from 'src/app/contratos/contrato.model';
import { ContratosService } from 'src/app/contratos/contratos.service';
import { GarantesService } from 'src/app/garantes/garantes.service';
import { HomeService } from 'src/app/home/home.service';
import { Pago } from 'src/app/pagos/pago.model';
import { PagosService } from 'src/app/pagos/pagos.service';
import { PropiedadesService } from 'src/app/propiedades/propiedades.service';

@Component({
  selector: 'app-alquileres-cobrados',
  templateUrl: './alquileres-cobrados.page.html',
  styleUrls: ['./alquileres-cobrados.page.scss'],
})
export class AlquileresCobradosPage implements OnInit {
  prueba: any;
  pagos: Pago[];
  pago: Pago;
  contratos: Contrato[];
  contrato: Contrato;
  datePago: any;
  pagoId: any;
  id: number;
  m: any;
  date: any;
  contratoId: any;
  anio: any;
  filters: { contrato: number; }[];
  propiedadNombre: any;
  propiedadId: any;
  router: any;
  m2: any;
  usuarioId: any;

  getMes(index){
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
getDia(index){
  const dia = new Array(7);
  dia[0] = 'Domingo';
  dia[1] = 'Lunes';
  dia[2] = 'Martes';
  dia[3] = 'Miercoles';
  dia[4] = 'Jueves';
  dia[5] = 'Viernes';
  dia[6] = 'Sabado';
  return dia[index];
}
  constructor(private homeService: HomeService, private pagoService: PagosService, private contratosService: ContratosService, private propiedadService: PropiedadesService) { }

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
    this.date = d.getDate();
    this.anio = d.getFullYear();
    console.log(this.anio);
    console.log(this.date);
    console.log(d);
    console.log(this.m);

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

    this.pagoService.getPagos() 
        .subscribe(data => {
          this.pagos = data.filter(data => new Date(data.fecha_pago).getMonth()+1 === this.m && this.usuarioId== data.usuario);
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
              propiedadId: this.contratosService.getContratoId(pago.contrato).propiedad,
              propiedadName: this.propiedadService.getPropiedadId(this.contratosService.getContratoId(pago.contrato).propiedad).ubicacion,
              usuario: pago.usuario
            };
            });
          console.log(this.pagos);
        });
  }

  ionViewDidEnter(){

      // FILTRO Y MAPEO DE TODOS LOS PAGOS COBRADOS EN EL MES CORRIENTE
       this.pagoService.getPagos() 
       .subscribe(data => {
        this.pagos = data.filter(data => new Date(data.fecha_pago).getMonth()+1 === this.m && this.usuarioId== data.usuario);
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
            propiedadId: this.contratosService.getContratoId(pago.contrato).propiedad,
            propiedadName: this.propiedadService.getPropiedadId(this.contratosService.getContratoId(pago.contrato).propiedad).ubicacion,
            usuario: pago.usuario
          };
          });
        console.log(this.pagos);
      });
    }
}