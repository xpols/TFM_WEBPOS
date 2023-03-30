import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SecureComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => console.log('Logout'));
  }

}
