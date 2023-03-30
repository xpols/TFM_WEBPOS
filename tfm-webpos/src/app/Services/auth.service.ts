import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';

const OAUTH_CLIENT = 'express-client';
const OAUTH_SECRET = 'express-secret';
const CLIENT_ID = 'nexttdirector';
const API_URL = 'https://nextt1.pre-api.nexttdirector.net:8443/NexttDirector_NexttApi/';
//const API_URL = 'http://nextt1.pre-api.nexttdirector.net:8080/NexttDirector_NexttApi/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  redirectUrl = '';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private static log(message: string): any {
    console.log(message);
  }

  login(loginData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('client_id', CLIENT_ID)
      .set('scope', 'read')
      .set('grant_type', 'password');

    return this.http.post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
          this.loggedIn.next(true);
        }),
        catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
          this.loggedIn.next(true);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.loggedIn.next(false);
  }

  loginLogico(): Observable<any> {
    return this.http.get<any>(API_URL + 'loginLogico')
      .pipe(tap(res => {
        return res;
      }),
      catchError(AuthService.handleError));
  }
}
