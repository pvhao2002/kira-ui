import {Component, ElementRef, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LogDTO} from './LogDTO';

@Component({
  selector: 'app-logs',
  imports: [
    FormsModule
  ],
  templateUrl: './logs.html',
  standalone: true,
  styleUrl: './logs.css'
})
export class Logs implements OnInit, OnDestroy {
  @ViewChild('logContainer') logContainer!: ElementRef<HTMLDivElement>;
  logLines = signal<LogDTO[]>([]);
  eventSource?: EventSource;
  currentHost = '';
  hosts: string[] = [];

  constructor(
    protected readonly http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.fetchHosts();
  }

  fetchHosts(): void {
    this.http.get<string[]>('/api/server').subscribe({
      next: (hosts) => {
        if (hosts.length > 0) {
          this.currentHost = hosts[0];
          this.startStream();
        }
        this.hosts = hosts;
      },
      error: (_) => {
      }
    });
  }


  startStream(): void {
    if (!this.currentHost) {
      return;
    }
    if (this.eventSource) {
      this.eventSource.close();
    }
    this.logLines.set([]); // Clear previous log lines

    this.eventSource = new EventSource(`/api/log/host?h=${this.currentHost}`);

    this.eventSource.addEventListener('log', (event: MessageEvent) => {
      const objLog = new LogDTO(event.lastEventId, event.data);

      this.logLines.update(lines => [...lines, objLog].slice(-1000)); // Keep only the last 1000 lines

      setTimeout(() => this.scrollToBottom(), 0); // Ensure the scroll happens after the DOM update
    });

    this.eventSource.onerror = (_) => {
      this.eventSource?.close();
    };
  }

  scrollToBottom(): void {
    requestAnimationFrame(() => {
      const element = this.logContainer?.nativeElement;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSource?.close();
  }
}
