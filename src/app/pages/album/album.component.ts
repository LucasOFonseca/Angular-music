import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackItemComponent } from '../../shared/components/track-item/track-item.component';
import { AlbumService } from './services/album.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [NgIf, NgFor, TrackItemComponent],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {
  readonly #albumService = inject(AlbumService);

  readonly id = this.activatedRoute.snapshot.paramMap.get('id');
  readonly album = this.#albumService.album;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.id) {
      this.#albumService.getAlbum(this.id).subscribe();
    }
  }

  goToArtist(id: string) {
    this.router.navigate(['artist', id]);
  }
}
