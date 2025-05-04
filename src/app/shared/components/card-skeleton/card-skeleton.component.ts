import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './card-skeleton.component.html',
  styleUrls: ['./card-skeleton.component.scss'],
})
export class CardSkeletonComponent {
  @Input() height = '200px';
  @Input() width = '100px';
}
