import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ShellComponent } from './layout/shell/shell.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        {
          path: '',
          component: ShellComponent,
          children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
              path: 'dashboard',
              loadComponent: () =>
                import('./modules/dashboard/dashboard/dashboard')
                  .then(m => m.DashboardComponent),
            },
            {
              path: 'signals',
              loadComponent: () =>
                import('./modules/signals/signals-list/signals-list')
                  .then(m => m.SignalsListComponent),
            },
            {
              path: 'trades',
              loadComponent: () =>
                import('./modules/trades/open-trades/open-trades')
                  .then(m => m.OpenTradesComponent),
            },
            {
              path: 'risk',
              loadComponent: () =>
                import('./modules/risk/risk-dashboard/risk-dashboard')
                  .then(m => m.RiskDashboardComponent),
            },
            {
              path: 'system',
              loadComponent: () =>
                import('./modules/system/system-status/system-status')
                  .then(m => m.SystemStatusComponent),
            },
            {
              path: 'backtesting',
              loadComponent: () =>
                import('./modules/backtesting/backtest-form/backtest-form')
                  .then(m => m.BacktestFormComponent),
            },
          ],
        },
      ],
      withComponentInputBinding()
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
};