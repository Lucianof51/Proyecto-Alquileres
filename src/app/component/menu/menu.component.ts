import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu: MenuController, private alertCtrl: AlertController, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {}
  async logout(){
    const alertElement = await this.alertCtrl.create({
      header: '¿Quiere cerrar sesión?',
      
      buttons: [
        {
         text: 'Cancelar',
         role: 'cancel'
        },
        {
   
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alertElement.present();
   }

}
