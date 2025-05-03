import { Component, Input } from '@angular/core';
import { LucideAngularModule, Music2Icon } from 'lucide-angular';
import { SimplifiedTrack } from '../../models/track.model';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-track-item',
  standalone: true,
  imports: [LucideAngularModule, DurationPipe],
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.scss'],
})
export class TrackItemComponent {
  readonly Music2Icon = Music2Icon;

  @Input() track!: SimplifiedTrack;
  @Input() trackNumber!: number;

  openSpotify() {
    window.open(this.track.uri, '_blank');
  }
}
