import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { SignalRService } from '../../../core/services/signalr.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common'; // لحل مشاكل الأنابيب (Pipes) والـ *ngIf
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // لحل مشكلة mat-icon
import { MatCardModule } from '@angular/material/card'; // لحل مشكلة mat-card و mat-card-content
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-open-trades',
  templateUrl: './open-trades.html',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,        // يُعطيك الـ *ngIf والـ Pipes الأساسية
    MatTableModule,
    MatIconModule,       // لتشغيل الأيقونات بجانب الصفقات
    MatCardModule,       // لتغليف بيانات الصفقة
    MatChipsModule,      // لعرض حالة الصفقة (ربح/خسارة) داخل عينات ملونة
    DecimalPipe,         // لحل مشكلة No pipe found with name 'number'
    DatePipe
  ],
})
export class OpenTradesComponent implements OnInit, OnDestroy {
  trades: any[] = [];
  liveUpdates: Record<string, any> = {};
  columns = ['symbol', 'type', 'entry', 'sl', 'tp', 'size', 'pnl', 'opened', 'actions'];

  private subs = new Subscription();

  constructor(
    private api: ApiService,
    private hub: SignalRService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.load();

    this.subs.add(this.hub.tradeUpdate$.subscribe(upd => {
      this.liveUpdates[upd.tradeId] = upd;
    }));

    this.subs.add(this.hub.tradeClosed$.subscribe(() => this.load()));
    this.subs.add(this.hub.tradeOpened$.subscribe(() => this.load()));
  }

  load(): void {
    this.api.getOpenTrades().subscribe(t => this.trades = t);
  }

  getLivePnL(trade: any): number {
    return this.liveUpdates[trade.id]?.unrealizedPnL ?? 0;
  }

  close(trade: any): void {
    if (!confirm(`Close trade ${trade.brokerTicket}?`)) return;

    this.api.closeTrade(trade.id).subscribe({
      next: () => {
        this.snack.open('Trade closed ✅', '', { duration: 2000 });
        this.load();
      },
      error: e => this.snack.open(e.error?.message ?? 'Error', '', { duration: 3000 }),
    });
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }
}