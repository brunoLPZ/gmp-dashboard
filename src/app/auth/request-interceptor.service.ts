import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable, isDevMode} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {KeycloakService} from 'keycloak-angular';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  readonly MESSAGE_COMPONENT_PATH = 'MODULE.MESSAGE.';

  constructor(
    public keycloakService: KeycloakService,
    private readonly router: Router
  ) {}

  /**
   * intercept all XHR request
   * @param request
   * @param next
   * @returns {Observable<A>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * continues request execution
     */
    return next.handle(request).pipe(
      catchError((error, caught: Observable<HttpEvent<any>>) => {
        if (error.status === 401 || error.status === 403) {
          this.handleAuthError();
          return of(error);
        }
        throw error;
      }),
      tap((httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse && isDevMode()) {
          console.log(
            `response of ${httpEvent.url} is status ${httpEvent.statusText} (${httpEvent.status})`
          );
        }
      })
    );
  }

  /**
   * Log out when service returns a response with status 401 or 403.
   */
  private handleAuthError() {
    // clear stored credentials; they're invalid
    const getUrl = window.location;
    const baseUrl = `${getUrl.protocol}//${getUrl.host}/gmp`;
    this.keycloakService.clearToken();
    this.keycloakService.logout(baseUrl);
  }
}
