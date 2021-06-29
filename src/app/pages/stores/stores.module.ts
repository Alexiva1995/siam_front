import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoresPage } from './stores.page';
import { ExploreContainerComponentModule } from '../../components/explore-container/explore-container.module';

import { StoresPageRoutingModule } from './stores-routing.module'
import { UIModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: StoresPage }]),
    StoresPageRoutingModule,
    UIModule
  ],
  declarations: [StoresPage]
})
export class StoresPageModule { }
