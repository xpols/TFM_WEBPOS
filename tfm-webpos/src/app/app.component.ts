import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from './Services/token.service';
import { SharedService } from './Services/shared.service';

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
      'path': '/sales',
      'icon':'fa-television'
    },
    {
      'title': 'Mesas',
      'path': '/tables',
      'icon':'fa-th'
    },
    {
      'title': 'Tickets',
      'path': '/tickets',
      'icon':'fa-list'
    },
    {
      'title': 'Config',
      'path': '/config',
      'icon':'fa-gear'
    }
    
  ];
  private _mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();

  isLoggedIn$: Observable<boolean> | undefined;

  numDiners: number = 0;
  tableName: string | undefined;
  private subscriptionTableName: Subscription | undefined;
  private subscriptionNumDiners: Subscription | undefined;
  emptySpacerShow: boolean = true;
  
  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public authService: AuthService, private router: Router, private tokenService: TokenService, private sharedService: SharedService ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    if(this.tokenService.getRefreshToken()!=null) {
      this.authService.refreshToken(this.tokenService.getRefreshToken());
    }
    this.authService.updateloggedIn();
    
  }

  ngAfterViewInit() {
    this.subscriptionTableName = this.sharedService.tableName$.subscribe(valor => {
      console.log("RECIBIMOS VALOR :: " + valor);
      this.tableName = valor;
      if(this.tableName != undefined && this.tableName != null) {
        this.emptySpacerShow = false;
      } else {
        this.emptySpacerShow = true;
      }
    });

    this.subscriptionNumDiners = this.sharedService.numDiners$.subscribe(valor => {
      console.log("RECIBIMOS VALOR numDiners :: " + valor);
      this.numDiners = valor;
      if(this.numDiners != undefined && this.numDiners != null) {
        this.emptySpacerShow = false;
      } else {
        this.emptySpacerShow = true;
      }
    });
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

  plus(): void {
    this.numDiners = Number(this.numDiners) + 1;
  }

  minus(): void {
    if(this.numDiners > 0) {
      this.numDiners = Number(this.numDiners) -1;
    }
  }

}
