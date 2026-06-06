import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common'; // لتشغيل أي شروط أو تكرارات أساسية
import { MatCardModule } from '@angular/material/card'; // لحل مشاكل mat-card, mat-card-header, mat-card-title, mat-card-content
import { MatChipsModule } from '@angular/material/chips';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,  // جلب موديول البطاقات لتغليف معلومات السيرفر
    MatChipsModule  // جلب موديول الـ Chips لإظهار الحالة (Online / Offline) بألوان مخصصة
  ],
})
export class SystemStatusComponent implements OnInit {
  health: any = {};
  aiStatus: any = {};

  constructor(private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.api.getHealth().subscribe(h => this.health = h);
    this.http.get(`${environment.apiBaseUrl}/ai/status`)
      .subscribe(s => this.aiStatus = s);
  }


}