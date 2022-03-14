import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from './proveedores.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Persona } from '../persona.model';
import { HomeService } from '../home/home.service';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  constructor(private homeService: HomeService, private proveedoresService: ProveedoresService, private router: Router , private menuCtrl: MenuController) { }
  proveedores: Persona[];
  usuarioId: any;
  ngOnInit() {
    this.usuarioId = this.homeService.setUsuarioId();
    this.proveedoresService.getProveedores()
    .subscribe(data => {
      this.proveedores = data.filter(data => this.usuarioId === data.usuario);
      this.proveedores = this.proveedores.map(garante =>{
        return {
        id: garante.id,
        nombre: garante.nombre,
        apellido: garante.apellido,
        DNI: garante.DNI,
        CUIT: garante.CUIT,
        telefono: garante.telefono,
        direccion: garante.direccion,
        email: garante.email,
        cuenta_bancaria: garante.cuenta_bancaria,
        usuario: garante.usuario
        };
      });
  });
  }

  goToHome() {
    this.router.navigate(['/home', this.usuarioId]);
  }

  addNewProveedor(){
    this.router.navigate(['/proveedor-add']);
  }

  updateProveedor(proveedorId){
    console.log(proveedorId);
    this.router.navigate(['/proveedor-update', proveedorId]);
    }
  verProveedor(proveedorId){
    this.router.navigate(['/proveedores', proveedorId]);
    }

    toggleMenu() {
      this.menuCtrl.toggle();
     }
  
  doRefresh(event) {
    this.usuarioId = this.homeService.setUsuarioId();
    this.proveedoresService.getProveedores()
    .subscribe(data => {
      this.proveedores = data.filter(data => this.usuarioId === data.usuario);
      this.proveedores = this.proveedores.map(garante =>{
        return {
        id: garante.id,
        nombre: garante.nombre,
        apellido: garante.apellido,
        DNI: garante.DNI,
        CUIT: garante.CUIT,
        telefono: garante.telefono,
        direccion: garante.direccion,
        email: garante.email,
        cuenta_bancaria: garante.cuenta_bancaria,
        usuario: garante.usuario
        };
      });
  });
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }

}
