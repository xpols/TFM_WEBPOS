import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from './Services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WebPOS';
  mobileQuery: MediaQueryList;
  nav = [
    {
      'title': 'Home',
      'path': '/home',
      'icon':'fa-home'
    },
    {
      'title': 'TPV',
      'path': '/tpv',
      'icon':'fa-cash-register'
    },
    {
      'title': 'Cocina',
      'path': '/kitchen',
      'icon':'fa-stroopwafel'
    },
    {
      'title': 'Tickets',
      'path': '/tickets',
      'icon':'fa-list'
    },
    {
      'title': 'Mesas',
      'path': '/tables',
      'icon':'fa-th'
    },
    {
      'title': 'Config',
      'path': '/config',
      'icon':'fa-th'
    }
    
  ];
  private _mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();

  isLoggedIn$: Observable<boolean> | undefined;
  
  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public authService: AuthService, private router: Router, private tokenService: TokenService ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    if(this.tokenService.getRefreshToken()!=null) {
      this.authService.refreshToken(this.tokenService.getRefreshToken());
    }
  }
  
  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }

  isLogged(): Observable<boolean> | undefined{
    return this.isLoggedIn$;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToLogout() {
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => console.log('Logout'));
  }

}
