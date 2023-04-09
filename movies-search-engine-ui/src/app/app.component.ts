import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/** The root component of the Movies Search Engine UI application */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movies-search-engine-ui';

  /**
   * Constructs a new instance of the AppComponent.
   * @param {MatIconRegistry} matIconRegistry - The Material icon registry used to register custom icons.
   * @param {DomSanitizer} domSanitizer - The DOM sanitizer used to bypass security and trust resources.
   */
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    /** Add the GitHub icon to the icon registry */
    this.matIconRegistry.addSvgIcon(
      `github_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/github.svg")
    );
  }
}
