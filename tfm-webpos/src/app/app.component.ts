import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

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
    }
  ];
  private _mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();

  isLoggedIn$: Observable<boolean> | undefined;
  
  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  
  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }

  isLogged(): Observable<boolean> | undefined{
    return this.isLoggedIn$;
  }
}
