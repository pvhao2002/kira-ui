import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Leagues} from '../model/League';
import {debounceTime, Subject, Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-league',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './league.html',
  standalone: true,
  styleUrl: './league.css'
})
export class League implements OnInit {
  data: Leagues[] = [];
  searchSubject = new Subject<string>();
  subscription!: Subscription;
  searchTerm = '';
  isMainFilter = '1';
  constructor(protected http: HttpClient) {
  }

  ngOnInit(): void {
    // Initialize data
    this.filterLeagues();

    // debounce search input
    this.subscription = this.searchSubject
      .pipe(debounceTime(500)) // wait for 300ms pause in events
      .subscribe(_ => {
        this.filterLeagues();
      });
  }

  filterLeagues(): void {
    this.http.get<Leagues[]>(`api/leagues?key=${this.searchTerm}&isMain=${this.isMainFilter}`).subscribe(res => {
      this.data = [...res];
    });
  }

  updateMain(item: Leagues): void {
    console.log(item)
    this.http.get(`api/leagues/update-main/${item.leagueId}?isMain=${item.isMain}`)
      .subscribe(_ => {
        this.filterLeagues();
      })
  }
}
