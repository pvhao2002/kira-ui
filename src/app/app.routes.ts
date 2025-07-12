import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home').then((mod) => mod.Home),
      },
      {
        path: 'league',
        loadComponent: () => import('./league/league').then((mod) => mod.League),
      },
      {
        path: 'event',
        loadComponent: () => import('./event/event').then((mod) => mod.Event),
      },
      {
        path: 'analyst',
        loadComponent: () => import('./analyst/analyst').then((mod) => mod.Analyst),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
