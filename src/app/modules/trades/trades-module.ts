import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradesRoutingModule } from './trades-routing-module';
import { TradeHistory } from './trade-history/trade-history';
import { OpenTradesComponent } from './open-trades/open-trades';

@NgModule({
  declarations: [TradeHistory],
  imports: [CommonModule, TradesRoutingModule,  OpenTradesComponent],
})
export class TradesModule { }
