import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // ── Market ───────────────────────────────────────────
  getSymbols(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/market/symbols`);
  }

  getCandles(symbol: string, timeframe = 'M5', from?: string, to?: string): Observable<any[]> {
    let params = new HttpParams()
      .set('symbol', symbol)
      .set('timeframe', timeframe);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<any[]>(`${this.base}/market/candles`, { params });
  }

  getLiveSnapshot(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.base}/market/live`, {
      params: new HttpParams().set('symbol', symbol),
    });
  }

  // ── Signals ──────────────────────────────────────────
  getSignals(status?: string, symbol?: string, page = 1, pageSize = 20): Observable<any> {
    let params = new HttpParams()
      .set('page', page).set('pageSize', pageSize);
    if (status) params = params.set('status', status);
    if (symbol) params = params.set('symbol', symbol);
    return this.http.get<any>(`${this.base}/signals`, { params });
  }

  approveSignal(id: string): Observable<any> {
    return this.http.patch(`${this.base}/signals/${id}/approve`, {});
  }

  rejectSignal(id: string, reason: string): Observable<any> {
    return this.http.patch(`${this.base}/signals/${id}/reject`, { reason });
  }

  // ── Trades ───────────────────────────────────────────
  getOpenTrades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/trades/open`);
  }

  getTradeHistory(page = 1, pageSize = 20): Observable<any> {
    const params = new HttpParams()
      .set('page', page).set('pageSize', pageSize);
    return this.http.get<any>(`${this.base}/trades/history`, { params });
  }

  manualExecute(signalId: string): Observable<any> {
    return this.http.post(`${this.base}/trades/manual-execute`, {
      signalId,
      requestId: crypto.randomUUID(),
      correlationId: crypto.randomUUID(),
      idempotencyKey: crypto.randomUUID(),
    });
  }

  closeTrade(tradeId: string): Observable<any> {
    return this.http.post(`${this.base}/trades/close`, { tradeId, reason: 'Manual' });
  }

  // ── Risk ─────────────────────────────────────────────
  getRiskConfigurations(): Observable<any> {
    return this.http.get<any>(`${this.base}/risk/configurations`);
  }

  updateSymbolRisk(symbolId: string, config: any): Observable<any> {
    return this.http.put(`${this.base}/risk/configurations/symbol/${symbolId}`, config);
  }

  getRiskExposure(): Observable<any> {
    return this.http.get<any>(`${this.base}/risk/exposure`);
  }

  getRiskEvents(page = 1, pageSize = 20): Observable<any> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<any>(`${this.base}/risk/events`, { params });
  }

  clearEmergencyStop(): Observable<any> {
    return this.http.post(`${this.base}/risk/emergency-stop/clear`, {});
  }

  // ── Health ───────────────────────────────────────────
  getHealth(): Observable<any> {
    return this.http.get<any>(`${this.base}/health`);
  }

  // Backtesting
  startBacktest(body: any): Observable<any> {
    return this.http.post(`${this.base}/backtesting/start`, body);
  }

  getBacktestSessions(page = 1, pageSize = 20): Observable<any> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<any>(`${this.base}/backtesting/sessions`, { params });
  }

  getBacktestResults(id: string): Observable<any> {
    return this.http.get<any>(`${this.base}/backtesting/results/${id}`);
  }
}