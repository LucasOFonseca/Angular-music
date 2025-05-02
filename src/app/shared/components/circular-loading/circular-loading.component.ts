import { Component } from '@angular/core';
import { LoaderCircleIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-circular-loading',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './circular-loading.component.html',
  styleUrls: ['./circular-loading.component.scss'],
})
export class CircularLoadingComponent {
  readonly LoaderCircleIcon = LoaderCircleIcon;
}
