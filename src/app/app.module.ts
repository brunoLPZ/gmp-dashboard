import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppAuthGuard } from "./auth/app-auth-guard";
import { initializer } from "./auth/app-init";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { SharedModule } from "./modules/shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { NotFoundComponent } from "./not-found/not-found.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RequestInterceptor } from "./auth/request-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    SharedModule,
    ToastrModule.forRoot({
      enableHtml: true,
      closeButton: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
      positionClass: 'toast-bottom-right',
      titleClass: 'toast-title-gmp'
    })
  ],
  providers: [
    AppAuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
