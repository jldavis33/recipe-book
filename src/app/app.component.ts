import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-book';
  loadedFeature: string = 'recipe';

  onNavigate(feature: string) {
      this.loadedFeature = feature;
  }
}
