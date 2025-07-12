import {Component, OnInit} from '@angular/core';
import {EventDTO} from '../model/EventDTO';
import {FormsModule} from '@angular/forms';
import {debounceTime, Subject, Subscription} from 'rxjs';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {ResponsePaging} from '../model/ResponsePaging';
import {HttpClient} from '@angular/common/http';
import {openPopup} from '../function/GlobalFunction';

@Component({
  selector: 'app-event',
  imports: [
    FormsModule,
    NgClass,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './event.html',
  standalone: true,
  styleUrl: './event.css'
})
export class Event implements OnInit {
  data: ResponsePaging<EventDTO> = {
    data: [],
    page: 1,
    size: 1_000,
    total: 0,
    isTeam: false,
    exact: false
  };
  searchSubject = new Subject<string>();
  subscription!: Subscription;
  searchTerm = '';
  loading = false;

  constructor(
    protected readonly http: HttpClient
  ) {
  }

  ngOnInit(): void {
    // debounce search input
    this.subscription = this.searchSubject
      .pipe(debounceTime(500)) // wait for 300ms pause in events
      .subscribe(_ => {
        this.load();
      });
    this.load();
  }

  load(): void {
    const url = `api/events?`
      .concat(`page=${this.data.page}`)
      .concat(`&size=${this.data.size}`)
      .concat(`&key=${this.searchTerm}`)
      .concat(`&isTeam=${this.data.isTeam}`)
      .concat(`&exact=${this.data.exact}`);
    this.loading = true;
    this.http.get<ResponsePaging<EventDTO>>(url)
      .subscribe(res => {
        this.loading = false;
        this.data = res;
        this.data.data.forEach(e => {
          e.logoHome = 'https://img0.aiscore.com/football/team/b65ee16a9cfe056825b1e0c15c05cf54.png!w60';
          e.logoAway = 'https://img0.aiscore.com/football/team/97ee43cef74dd2025cec4a2cefd401ab.png!w60';
        });
      });
  }

  protected readonly openPopup = openPopup;
}
