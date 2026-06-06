import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common'; // 1. لحل مشكلة *ngIf, *ngFor و الـ Pipes
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';       // 2. لحل مشكلة mat-card-header, mat-card-title, mat-card-content
import { MatChipsModule } from '@angular/material/chips';     // 3. لحل مشكلة mat-chip و [color]
import { MatIconModule } from '@angular/material/icon';       // 4. لحل مشكلة mat-icon
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // 1. استيراد الموديول لتشغيل القوائم المنسدلة وخياراتها

@Component({
  selector: 'app-backtest-form',
  templateUrl: './backtest-form.html',
  standalone: true,
  imports: [
    CommonModule,          // يعطي الصلاحية للـ *ngFor والـ *ngIf لتكرار بيانات الاختبار وعرضها
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,         // لتغليف وعرض كروت ملخص نتائج الـ Backtest
    MatChipsModule,        // لإظهار الـ Win Rate أو الصفقات الرابحة كـ Chips ملونة
    MatIconModule,         // لعرض أيقونات الرسوم البيانية أو اتجاه الصفقات
    MatFormFieldModule,
    MatInputModule,
    DecimalPipe,
    MatSelectModule
  ]
})
export class BacktestFormComponent implements OnInit {
  form!: FormGroup;
  sessions: any[] = [];
  loading = false;
  columns = ['sessionName', 'symbol', 'trades', 'winRate', 'profitFactor', 'maxDD', 'netProfit', 'status', 'actions'];

  symbols = ['XAUUSD', 'USOIL'];
  timeframes = ['M5', 'M15', 'M30', 'H1'];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      symbol: ['XAUUSD', Validators.required],
      timeframe: ['M15', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      initialBalance: [10000, [Validators.required, Validators.min(100)]],
      riskPercentage: [1, [Validators.required, Validators.min(0.1), Validators.max(5)]],
    });

    this.loadSessions();
  }

  loadSessions(): void {
    this.api.getBacktestSessions().subscribe(r => this.sessions = r.data);
  }

  run(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const body = {
      symbol: this.form.value.symbol,
      timeframe: this.form.value.timeframe,
      startDate: new Date(this.form.value.startDate).toISOString(),
      endDate: new Date(this.form.value.endDate).toISOString(),
      initialBalance: this.form.value.initialBalance,
      riskPercentage: this.form.value.riskPercentage,
    };

    this.api.startBacktest(body).subscribe({
      next: () => {
        this.snack.open('Backtest started! ⏳', '', { duration: 3000 });
        this.loading = false;
        setTimeout(() => this.loadSessions(), 3000);
      },
      error: e => {
        this.snack.open(e.error?.message ?? 'Error', '', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  viewResults(id: string): void {
    this.router.navigate(['/backtesting/results', id]);
  }

  statusColor(status: string): string {
    if (status === 'Completed') return 'primary';
    if (status === 'Running') return 'accent';
    if (status === 'Failed') return 'warn';
    return '';
  }
}