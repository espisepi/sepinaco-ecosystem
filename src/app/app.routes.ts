import { Routes } from '@angular/router';
import { ThreeComponent } from './features/threejs/components/three.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/three',
    pathMatch: 'full'
  },
  {
    path: 'three',
    component: ThreeComponent
  }
];
