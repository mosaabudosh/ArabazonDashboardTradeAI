import { Component, OnInit } from '@angular/core';
import { SignalRService } from './core/services/signalr.service';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [
    RouterOutlet // 2. إضافته هنا في الـ imports
    // باقي الـ imports الحالية...
  ],
})
export class AppComponent implements OnInit {
  constructor(private hub: SignalRService) { }

  ngOnInit(): void {
    this.hub.connectAll().catch(err =>
      console.error('SignalR connection failed:', err));
  }
}