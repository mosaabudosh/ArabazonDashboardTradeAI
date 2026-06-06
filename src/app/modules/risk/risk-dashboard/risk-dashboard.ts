import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // لتشغيل formControlName والأزرار التفاعلية
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field'; // لحل مشكلة mat-form-field و mat-label
import { MatInputModule } from '@angular/material/input';         // لضمان عمل الحقول بداخل الفورم
import { MatSlideToggleModule } from '@angular/material/slide-toggle';  // لحل مشاكل mat-card-header و mat-card-title و mat-card-content
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-risk-dashboard',
  templateUrl: './risk-dashboard.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule, // <--- أضفها هنا لتفعيل خاصية تلوين الأزرار والتنقل بين الرموز
    DecimalPipe,
    DatePipe
  ],
})
export class RiskDashboardComponent implements OnInit {
  exposure: any = {};
  symbolConfigs: any[] = [];
  riskEvents: any[] = [];
  selectedConfig: any = null;
  form!: FormGroup;

  eventColumns = ['eventType', 'severity', 'description', 'current', 'threshold', 'triggeredAt'];

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadAll();
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      maxRiskPerTrade: [1, [Validators.required, Validators.min(0.1), Validators.max(5)]],
      maxDailyLoss: [3, [Validators.required, Validators.min(0.5), Validators.max(10)]],
      maxSpreadAllowed: [25, Validators.required],
      maxSlippageAllowed: [1, Validators.required],
      maxConcurrentTrades: [1, Validators.required],
      autoTradingEnabled: [false],
    });
  }

  loadAll(): void {
    this.api.getRiskExposure().subscribe(e => this.exposure = e);
    this.api.getRiskConfigurations().subscribe(r => {
      this.symbolConfigs = r.symbols;
    });
    this.api.getRiskEvents().subscribe(r => this.riskEvents = r.data);
  }

  selectConfig(config: any): void {
    this.selectedConfig = config;
    this.form.patchValue({
      maxRiskPerTrade: config.maxRiskPerTrade,
      maxDailyLoss: config.maxDailyLoss,
      maxSpreadAllowed: config.maxSpreadAllowed,
      maxSlippageAllowed: config.maxSlippageAllowed,
      maxConcurrentTrades: config.maxConcurrentTrades,
      autoTradingEnabled: config.autoTradingEnabled,
    });
  }

  saveConfig(): void {
    if (!this.selectedConfig || this.form.invalid) return;
    this.api.updateSymbolRisk(this.selectedConfig.symbolId, this.form.value).subscribe({
      next: () => {
        this.snack.open('Risk config updated ✅', '', { duration: 2000 });
        this.loadAll();
      },
      error: e => this.snack.open(e.error?.message ?? 'Error', '', { duration: 3000 }),
    });
  }

  clearEmergencyStop(): void {
    if (!confirm('Clear emergency stop?')) return;
    this.api.clearEmergencyStop().subscribe({
      next: () => {
        this.snack.open('Emergency stop cleared ✅', '', { duration: 2000 });
        this.loadAll();
      },
    });
  }
}