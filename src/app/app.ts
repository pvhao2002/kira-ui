import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected menus: MenuItem[] = [
    {label: 'Home', link: '/home', icon: 'fas fa-home'},
    {label: 'League', link: '/league', icon: 'fas fa-trophy'},
    {label: 'Event', link: '/event', icon: 'fas fa-calendar-alt'},
    {label: 'Analyst', link: '/analyst', icon: 'fas fa-chart-line'},
    {label: 'Today Event', link: '/today-event', icon: 'fas fa-calendar'},
    {label: 'Logs', link: '/logs', icon: 'fas fa-file-alt'},
  ];

  constructor(protected router: Router) {
  }

  clickMenu(menu: MenuItem): void {
    if (menu.link) {
      this.router.navigate([menu.link]).then(it => {
        if (it) {
          this.menus.forEach(m => m.active = false);
          menu.active = true;
        }
      });
    }
  }

  ngOnInit(): void {
    const currentUrl = location.href;
    this.menus.forEach(menu => {
      menu.active = currentUrl.includes(menu.link);
      if (menu.children) {
        menu.children.forEach(child => {
          child.active = child.link === currentUrl;
        });
      }
    });
  }
}


export interface MenuItem {
  label: string;
  icon?: string;
  link: string;
  active?: boolean;
  children?: MenuItem[];
}

