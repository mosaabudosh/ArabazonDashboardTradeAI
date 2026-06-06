import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalsRoutingModule } from './signals-routing-module';
import { SignalsListComponent } from './signals-list/signals-list';

@NgModule({
  declarations: [],
  imports: [CommonModule, SignalsRoutingModule, SignalsListComponent],
})
export class SignalsModule { }
