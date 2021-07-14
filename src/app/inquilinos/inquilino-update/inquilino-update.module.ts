import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquilinoUpdatePageRoutingModule } from './inquilino-update-routing.module';

import { InquilinoUpdatePage } from './inquilino-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquilinoUpdatePageRoutingModule
  ],
  declarations: [InquilinoUpdatePage]
})
export class InquilinoUpdatePageModule {}
