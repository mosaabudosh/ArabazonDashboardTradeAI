import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SignalRService {

  // ── Subjects ─────────────────────────────────────────
  tick$ = new Subject<any>();
  signal$ = new Subject<any>();
  tradeUpdate$ = new Subject<any>();
  tradeClosed$ = new Subject<any>();
  tradeOpened$ = new Subject<any>();
  notification$ = new Subject<any>();

  private marketHub!: signalR.HubConnection;
  private signalHub!: signalR.HubConnection;
  private tradeHub!: signalR.HubConnection;

  private async connectNotifications(): Promise<void> {
    const notifHub = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalR.notificationHub)
      .withAutomaticReconnect()
      .build();

    notifHub.on('ReceiveNotification', data => this.notification$.next(data));
    await notifHub.start();
    await notifHub.invoke('Subscribe');
  }
  async connectAll(): Promise<void> {
    await this.connectMarket();
    await this.connectSignals();
    await this.connectTrades();
  }

  // ── Market Hub ───────────────────────────────────────
  private async connectMarket(): Promise<void> {
    this.marketHub = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalR.marketHub)
      .withAutomaticReconnect()
      .build();

    this.marketHub.on('ReceiveTick', data => this.tick$.next(data));

    await this.marketHub.start();
    await this.marketHub.invoke('SubscribeToSymbol', 'XAUUSD');
    await this.marketHub.invoke('SubscribeToSymbol', 'USOIL');
  }

  // ── Signal Hub ───────────────────────────────────────
  private async connectSignals(): Promise<void> {
    this.signalHub = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalR.signalHub)
      .withAutomaticReconnect()
      .build();

    this.signalHub.on('ReceiveSignal', data => this.signal$.next(data));

    await this.signalHub.start();
    await this.signalHub.invoke('SubscribeToSignals');
  }

  // ── Trade Hub ────────────────────────────────────────
  private async connectTrades(): Promise<void> {
    this.tradeHub = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalR.tradeHub)
      .withAutomaticReconnect()
      .build();

    this.tradeHub.on('ReceiveTradeUpdate', data => this.tradeUpdate$.next(data));
    this.tradeHub.on('ReceiveTradeClosed', data => this.tradeClosed$.next(data));
    this.tradeHub.on('ReceiveTradeOpened', data => this.tradeOpened$.next(data));

    await this.tradeHub.start();
    await this.tradeHub.invoke('SubscribeToTrades');
  }
}