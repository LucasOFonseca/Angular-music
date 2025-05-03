import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscAlbumIcon, LucideAngularModule } from 'lucide-angular';
import { SimplifiedAlbum } from 'src/app/shared/models/album.model';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [NgIf, LucideAngularModule],
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss'],
})
export class AlbumCardComponent {
  readonly DiscAlbumIcon = DiscAlbumIcon;

  @Input() album!: SimplifiedAlbum;

  readonly artistId = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  openAlbum() {
    this.router.navigate(['album', this.album.id], {
      queryParams: { artist: this.artistId },
      queryParamsHandling: 'merge',
    });
  }
}
