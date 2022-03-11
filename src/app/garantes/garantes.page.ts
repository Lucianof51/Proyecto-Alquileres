import { Component, OnInit } from '@angular/core';
import { GarantesService } from './garantes.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-garantes',
  templateUrl: './garantes.page.html',
  styleUrls: ['./garantes.page.scss'],
})
export class GarantesPage implements OnInit {

  constructor(private menuCtrl: MenuController, private garantesService: GarantesService, private router: Router) { }
  garantes = [];
  ngOnInit() {
    this.garantesService.getGarantes()
    .subscribe(data => {
      console.log(data);
      this.garantes = data;
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  addNewGarante(){
    this.router.navigate(['/garante-add']);
  }
  updateGarante(garanteId){
  console.log(garanteId);
  this.router.navigate(['/garante-update', garanteId]);
  }
  verGarantes(garanteId){
    this.router.navigate(['/garantes', garanteId]);
  }
  toggleMenu() {
    this.menuCtrl.toggle();
   }
  
   doRefresh(event) {
    console.log('Begin async operation');
    this.garantesService.getGarantes()
    .subscribe(data => {
      console.log(data);
      this.garantes = data;
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
