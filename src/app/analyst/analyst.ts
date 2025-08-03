import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {EventOddDTO, FilterOddLineDTO, OddLineDTO} from './FilterOddLineDTO';
import {openPopup} from '../function/GlobalFunction';
import {ResponsePaging} from '../model/ResponsePaging';

@Component({
  selector: 'app-analyst',
  imports: [
    FormsModule,
    DecimalPipe,
    DatePipe,
    NgClass,
  ],
  templateUrl: './analyst.html',
  standalone: true,
  styleUrl: './analyst.css'
})
export class Analyst implements OnInit {
  filter: FilterOddLineDTO[] = [
    new FilterOddLineDTO('HDC', 'hdc', '-0.5#+0.5', '-0.5#+0.5'),
    new FilterOddLineDTO('OU', 'ou', '2.5', '2.5'),
  ];

  data: ResponsePaging<EventOddDTO> = {data: []};
  loading = false;
  flagHighlight = {
    hdc: '',
    ou: '',
  };

  constructor(protected readonly http: HttpClient) {
  }

  ngOnInit() {
  }

  getLineOfHdc(line: string): string {
    if (line === '0') {
      return '0#0';
    }
    if (line.includes('#')) {
      return line;
    }
    const sign = line.startsWith('-') ? '+' : '-';
    const hdcLine = line.substring(1);
    return `${line}#${sign}${hdcLine}`;
  }

  load(): void {
    if (this.loading) {
      return;
    }
    this.data = {data: []};
    const params = this.filter.map(f => ({
      type: f.type,
      firstLine: f.type === 'hdc' ? this.getLineOfHdc(f.firstLine) : f.firstLine,
      lastLine: f.type === 'hdc' ? this.getLineOfHdc(f.lastLine) : f.lastLine,
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

  highlightHdc(type: string): void {
    if (this.flagHighlight.hdc === type) {
      this.flagHighlight.hdc = '';
      this.data.scoreSummary?.forEach(e => {
        e.highlightH2A = false;
        e.highlightO2U = false;
        e.highlight = false;
      });
      this.sortByHighlight();
      return;
    }
    this.flagHighlight.hdc = type;
    this.data.scoreSummary?.forEach(e => {
      e.highlightH2A = e.h2a?.toUpperCase() === type.toUpperCase();
      e.highlight = e.highlightO2U && e.highlightH2A;
    });
    this.sortByHighlight();
  }

  highlightOu(type: string): void {
    if (this.flagHighlight.ou === type) {
      this.flagHighlight.ou = '';
      this.data.scoreSummary?.forEach(e => {
        e.highlightH2A = false;
        e.highlightO2U = false;
        e.highlight = false;
      });
      this.sortByHighlight();
      return;
    }

    this.flagHighlight.ou = type;
    this.data.scoreSummary?.forEach(e => {
      e.highlightO2U = e.o2u?.toUpperCase() === type.toUpperCase();
      e.highlight = e.highlightO2U && e.highlightH2A;
    });
    this.sortByHighlight();
  }

  sortByHighlight(): void {
    this.data.scoreSummary?.sort((a, b) => {
      // Ưu tiên highlight = true lên đầu
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;

      // Nếu cùng highlight, sắp theo cnt giảm dần
      return (b.cnt ?? 0) - (a.cnt ?? 0);
    });
  }

  protected readonly openPopup = openPopup;
}
