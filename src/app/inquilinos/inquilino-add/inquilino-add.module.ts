import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquilinoAddPageRoutingModule } from './inquilino-add-routing.module';

import { InquilinoAddPage } from './inquilino-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquilinoAddPageRoutingModule
  ],
  declarations: [InquilinoAddPage]
})
export class InquilinoAddPageModule {}
