import { Component } from '@angular/core';
import { SignalRService } from '../../core/services/signalr.service';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // 1. لحل مشكلة router-outlet والتنقل
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';         // 1. لحل مشكلة mat-nav-list
import { MatMenuModule } from '@angular/material/menu';         // 2. لحل مشكلة mat-menu و matMenuTriggerFor
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,         // يغذي الـ <mat-nav-list> في القائمة الجانبية
    MatMenuModule,         // يشغل القوائم المنسدلة للتحكم بالـ Bot أو الحساب
    MatBadgeModule,
  ],
})
export class ShellComponent {
  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Market', icon: 'show_chart', route: '/market' },
    { label: 'Signals', icon: 'notifications', route: '/signals' },
    { label: 'Trades', icon: 'swap_horiz', route: '/trades' },
    { label: 'Risk', icon: 'shield', route: '/risk' },
    { label: 'System', icon: 'settings', route: '/system' },
    { label: 'Backtesting', icon: 'history', route: '/backtesting' },
  ];

  notifications: any[] = [];
  unreadCount = 0;

  constructor(private hub: SignalRService, private api: ApiService) { }

  ngOnInit(): void {
    this.hub.notification$.subscribe(n => {
      this.notifications.unshift(n);
      this.unreadCount++;
    });
  }

  clearNotifications(): void {
    this.unreadCount = 0;
  }
}