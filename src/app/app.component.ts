import { Component, inject } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.initializeTheme();
  }
}
