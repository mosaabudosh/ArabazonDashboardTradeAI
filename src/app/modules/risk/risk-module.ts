import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskRoutingModule } from './risk-routing-module';
import { RiskDashboardComponent } from './risk-dashboard/risk-dashboard';

@NgModule({
  declarations: [],
  imports: [CommonModule, RiskRoutingModule, RiskDashboardComponent],
})
export class RiskModule { }
