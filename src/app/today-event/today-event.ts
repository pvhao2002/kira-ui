import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodayEventResponse} from './TodayEventDTO';
import {openPopup} from '../function/GlobalFunction';

@Component({
  selector: 'app-today-event',
  imports: [
  ],
  templateUrl: './today-event.html',
  standalone: true,
  styleUrl: './today-event.css'
})
export class TodayEvent implements OnInit {
  protected data: TodayEventResponse[] = [];

  constructor(protected readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<TodayEventResponse[]>('/api/today-event').subscribe({
      next: (res) => {
        this.data = res;
      }
    });
  }

  protected readonly openPopup = openPopup;
}
