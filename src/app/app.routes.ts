import { Routes } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then((x) => x.LoginComponent
        )
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'pages/error',
  },
];
