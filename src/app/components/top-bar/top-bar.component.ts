import { Component, inject } from '@angular/core';
import { LucideAngularModule, MoonIcon, SunIcon } from 'lucide-angular';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [LucideAngularModule, SearchBarComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  readonly MoonIcon = MoonIcon;
  readonly SunIcon = SunIcon;

  readonly themeService = inject(ThemeService);
}
