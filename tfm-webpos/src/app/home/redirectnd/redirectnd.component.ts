import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowRef } from './window-ref';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'redirectnd',
  templateUrl: './redirectnd.component.html',
  styleUrls: ['./redirectnd.component.scss']
})
export class RedirectndComponent implements OnInit {

  mtoND: string | null = null;

  constructor(private route: ActivatedRoute, private windowRef: WindowRef, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.mtoND = this.route.snapshot.paramMap.get('mtoND');
    let url = "https://nextt.pre.nexttdirector.net/#!/"+this.mtoND+"/listar?token="+this.tokenService.getToken();
    this.abrirNuevaPestana(url);
  }

  abrirNuevaPestana(url: string): void {
    this.windowRef.open(url, '_blank');
  }

}
