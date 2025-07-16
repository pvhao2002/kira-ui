import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AccordionComponent, AccordionPanelComponent} from 'ngx-bootstrap/accordion';
import {HttpClient} from '@angular/common/http';
import {TodayEventDTO} from './TodayEventDTO';

@Component({
  selector: 'app-today-event',
  imports: [
    DatePipe,
    DecimalPipe,
    FormsModule,
    AccordionComponent,
    AccordionPanelComponent
  ],
  templateUrl: './today-event.html',
  standalone: true,
  styleUrl: './today-event.css'
})
export class TodayEvent implements OnInit {
  data: TodayEventDTO[] = [
    new TodayEventDTO('2025-01-13 00:00:00', 'CD Binefar', 'CA Monzon', 'Spain: Spanish Tercera División RFEF')
  ];

  constructor(protected readonly http: HttpClient) {
  }

  ngOnInit(): void {
  }

}
