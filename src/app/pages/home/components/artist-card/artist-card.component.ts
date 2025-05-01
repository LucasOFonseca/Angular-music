import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/shared/models/artist.model';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss'],
})
export class ArtistCardComponent {
  @Input() artist!: Artist;
}
