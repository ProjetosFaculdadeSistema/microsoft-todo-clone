import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ThemeService } from './app/core/theme.service';

const themeService = new ThemeService();
themeService.init();

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
