import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import 'bootstrap/dist/js/bootstrap.bundle.min';  // bootstrap functionality

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
