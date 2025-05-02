import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'artist/:id',
    loadComponent: () =>
      import('./pages/artist/artist.component').then((c) => c.ArtistComponent),
  },
  {
    path: 'album/:id',
    loadComponent: () =>
      import('./pages/album/album.component').then((c) => c.AlbumComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
