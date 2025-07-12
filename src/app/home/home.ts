import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {DashboardDTO} from '../model/DashboardDTO';

@Component({
  selector: 'app-home',
  imports: [
    DecimalPipe
  ],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.css'
})
export class Home implements OnInit {
  data: DashboardDTO = new DashboardDTO();

  constructor(protected readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<DashboardDTO>('api/dashboard')
      .subscribe(res => {
        this.data = res;
      });
  }

}
