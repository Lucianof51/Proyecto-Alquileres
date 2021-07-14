import { Component, OnInit } from '@angular/core';
import { InquilinosService } from 'src/app/inquilinos/inquilinos.service';
import { LocadoresService } from 'src/app/locadores/locadores.service';
import { AvisoService } from '../aviso.service';

@Component({
  selector: 'app-aviso-add',
  templateUrl: './aviso-add.page.html',
  styleUrls: ['./aviso-add.page.scss'],
})
export class AvisoAddPage implements OnInit {

  locadores = [];
  inquilinos = [];
  // tslint:disable-next-line:max-line-length
  constructor(private avisoService: AvisoService, private locadoresService: LocadoresService, private inquilinosService: InquilinosService) { }

ngOnInit() {
  this.locadoresService.getLocadores()
      .subscribe(data => {
      this.locadores = data;
      });
  this.inquilinosService.getInquilinos()
      .subscribe(data => {
      console.log(data);
      this.inquilinos = data;
      });
}

// tslint:disable-next-line:max-line-length
saveNewAvisos(locador2: HTMLInputElement, inquilino2: HTMLInputElement, motivo2: HTMLInputElement, descripcion2: HTMLInputElement, fecha2: HTMLInputElement){
const descripcion = descripcion2.value;
const motivo = motivo2.value;
const fecha = fecha2.value;
const locador = locador2.value;
const inquilino = inquilino2.value;
const val = {
locador,
inquilino,
motivo,
descripcion,
fecha
};
this.avisoService.addAviso(val).subscribe(res => {
alert(res.toString());
});
}

}
