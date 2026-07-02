import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { PageNotFound } from './pages/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((mod) => mod.Login),
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts').then((mod) => mod.Posts),
  },
  {
    path: 'posts/new',
    loadComponent: () => import('./pages/new-post/new-post').then((mod) => mod.NewPost),
    canActivate: [authGuard],
  },
  {
    path: 'posts/:slug',
    loadComponent: () => import('./pages/post/post').then((mod) => mod.Post),
  },
  {
    path: 'posts/:slug/edit',
    loadComponent: () => import('./pages/edit-post/edit-post').then((mod) => mod.EditPost),
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
