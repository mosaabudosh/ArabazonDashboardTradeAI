import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacktestingRoutingModule } from './backtesting-routing-module';
import { BacktestResults } from './backtest-results/backtest-results';
import { BacktestFormComponent } from './backtest-form/backtest-form';
import { ReactiveFormsModule } from '@angular/forms'; // لحل مشكلة [formGroup]
import { MatCardModule } from '@angular/material/card'; // لحل مشكلة mat-card
import { MatFormFieldModule } from '@angular/material/form-field'; // لحل مشكلة mat-form-field
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [BacktestResults],
  imports: [CommonModule, BacktestingRoutingModule, BacktestFormComponent, ReactiveFormsModule,   // جلب أدوات الفورم
    MatCardModule,         // جلب أدوات الكارد الخاصة بـ Material
    MatFormFieldModule,    // جلب حقول الإدخال
    MatInputModule],
})
export class BacktestingModule { }
