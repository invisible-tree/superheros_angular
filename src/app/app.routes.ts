import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';

export const routes: Routes = [ 
  {
    path: '',
    component: HomeComponent,
    title: 'Listado de superhéroes'
  },
  {
    path: 'add',
    component: EditComponent,
    title: 'Añadir superhéroe',
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: EditComponent,
    title: 'Editar',
    pathMatch: 'full'
  },
];
