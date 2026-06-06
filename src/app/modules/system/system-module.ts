import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing-module';
import { SystemStatusComponent } from './system-status/system-status';

@NgModule({
  declarations: [],
  imports: [CommonModule, SystemRoutingModule, SystemStatusComponent],
})
export class SystemModule { }
