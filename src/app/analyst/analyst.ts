import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe} from '@angular/common';
import {EventOddDTO, FilterOddLineDTO, OddLineDTO} from './FilterOddLineDTO';
import {openPopup} from '../function/GlobalFunction';
import {ResponsePaging} from '../model/ResponsePaging';

@Component({
  selector: 'app-analyst',
  imports: [
    FormsModule,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './analyst.html',
  standalone: true,
  styleUrl: './analyst.css'
})
export class Analyst implements OnInit {
  filter: FilterOddLineDTO[] = [
    new FilterOddLineDTO('HDC', 'hdc', '3.25'),
    new FilterOddLineDTO('OU', 'ou', '4/4.5'),
  ];

  data: ResponsePaging<EventOddDTO> = {data: []};
  loading = false;

  constructor(protected readonly http: HttpClient) {
  }

  ngOnInit() {
  }

  load(): void {
    const params = this.filter.map(f => ({
      type: f.type,
      line: f.line,
      odd1: f.odd1,
      odd2: f.odd2,
      isCompareOdd: f.isCompareOdd,
    }));
    this.loading = true;
    this.http.post<ResponsePaging<EventOddDTO>>('api/events/filter-odd', params)
      .subscribe({
        next: (res) => {
          this.data = res;
        },
        error: (error) => {
          console.error('Error loading data:', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  isHdc(odd: OddLineDTO): boolean {
    return odd.oddType.toUpperCase() === 'HDC';
  }

  protected readonly openPopup = openPopup;
}
