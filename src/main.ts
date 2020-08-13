import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environmentLoader as environmentLoaderPromise } from './app/envs/environment-loader';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


environmentLoaderPromise.then(env => {
  if (environment.production) {
    enableProdMode();
  }
  environment.settings = env.settings;
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
