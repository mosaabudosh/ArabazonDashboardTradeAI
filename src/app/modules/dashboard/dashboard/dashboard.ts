import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { SignalRService } from '../../../core/services/signalr.service';
import { CommonModule, DecimalPipe } from '@angular/common'; // جلب الـ Pipes الأساسية
import { MatChipsModule } from '@angular/material/chips';   // لتفعيل الـ mat-chip وخاصية الـ [color]
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule, 
    MatTableModule,
    MatCardModule, 
    DecimalPipe   
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  ticks: Record<string, any> = {};
  openTradesCount = 0;
  pendingSignalsCount = 0;
  dailyLoss = 0;
  isEmergencyStop = false;
  recentSignals: any[] = [];

  private subs = new Subscription();

  constructor(
    private api: ApiService,
    private hub: SignalRService,
  ) {}

  ngOnInit(): void {
    this.loadSummary();

    this.subs.add(this.hub.tick$.subscribe(tick => {
      this.ticks[tick.symbol] = tick;
    }));

    this.subs.add(this.hub.signal$.subscribe(() => {
      this.pendingSignalsCount++;
      this.loadRecentSignals();
    }));

    this.subs.add(this.hub.tradeOpened$.subscribe(() => {
      this.openTradesCount++;
    }));

    this.subs.add(this.hub.tradeClosed$.subscribe(() => {
      this.openTradesCount = Math.max(0, this.openTradesCount - 1);
      this.loadExposure();
    }));
  }

  loadSummary(): void {
    this.api.getOpenTrades().subscribe(t => this.openTradesCount = t.length);
    this.api.getSignals('Pending').subscribe(r => this.pendingSignalsCount = r.total);
    this.loadExposure();
    this.loadRecentSignals();
  }

  loadExposure(): void {
    this.api.getRiskExposure().subscribe(e => {
      this.dailyLoss       = e.dailyLoss;
      this.isEmergencyStop = e.isEmergencyStop;
    });
  }

  loadRecentSignals(): void {
    this.api.getSignals(undefined, undefined, 1, 5)
      .subscribe(r => this.recentSignals = r.data);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}