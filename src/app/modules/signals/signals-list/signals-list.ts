import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { SignalRService } from '../../../core/services/signalr.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common'; // لحل مشاكل *ngIf والـ Pipes
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // 1. لحل مشكلة mat-paginator و [length] و [pageSize]
import { MatIconModule } from '@angular/material/icon';           // 2. لحل مشكلة mat-icon
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card'; // لحل مشكلة mat-card
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signals-list',
  templateUrl: './signals-list.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatChipsModule,
    DecimalPipe,
    DatePipe,
    MatCardModule,
    MatProgressSpinnerModule,
  ]
})
export class SignalsListComponent implements OnInit, OnDestroy {
  signals: any[] = [];
  total = 0;
  page = 1;
  pageSize = 20;
  loading = false;
  columns = ['symbol', 'type', 'entry', 'sl', 'tp', 'confidence', 'status', 'time', 'actions'];

  private subs = new Subscription();

  constructor(
    private api: ApiService,
    private hub: SignalRService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.load();
    this.subs.add(this.hub.signal$.subscribe(() => this.load()));
  }

  load(): void {
    this.loading = true;
    this.api.getSignals(undefined, undefined, this.page, this.pageSize).subscribe({
      next: r => { this.signals = r.data; this.total = r.total; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  approve(signal: any): void {
    this.api.approveSignal(signal.id).subscribe({
      next: () => {
        this.snack.open('Signal approved ✅', '', { duration: 2000 });
        this.load();
      },
      error: e => this.snack.open(e.error?.message ?? 'Error', '', { duration: 3000 }),
    });
  }

  reject(signal: any): void {
    this.api.rejectSignal(signal.id, 'Manual rejection').subscribe({
      next: () => {
        this.snack.open('Signal rejected', '', { duration: 2000 });
        this.load();
      },
    });
  }

  execute(signal: any): void {
    this.api.manualExecute(signal.id).subscribe({
      next: r => this.snack.open(`Trade executed! Ticket: ${r.brokerTicket}`, '', { duration: 4000 }),
      error: e => this.snack.open(e.error?.message ?? 'Execution failed', '', { duration: 3000 }),
    });
  }

  onPageChange(e: any): void {
    this.page = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.load();
  }

  confidenceColor(score: number): string {
    if (score >= 75) return 'primary';
    if (score >= 55) return 'accent';
    return 'warn';
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }
}