import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  #formBuilder = inject(FormBuilder);

  readonly SearchIcon = SearchIcon;

  form = this.#formBuilder.group({
    search: '',
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const q = params.get('q');
      if (q && decodeURIComponent(q) !== this.form.get('search')?.value) {
        this.form.get('search')?.patchValue(decodeURIComponent(q));
      }
    });

    this.form
      .get('search')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value) =>
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            q: value !== '' ? encodeURIComponent(value ?? '') : null,
            page: value !== '' ? 1 : null,
          },
          queryParamsHandling: 'merge',
        })
      );
  }
}
