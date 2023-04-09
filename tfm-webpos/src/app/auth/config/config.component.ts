import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Services/config.service';
import { TiendaDTO } from '../../models/tienda.dto';
import { TpvDTO } from 'src/app/models/tpv.dto';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginlogicoService } from 'src/app/Services/loginlogico.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ConfigComponent implements OnInit {

  message = '';
  isLoadingResults = false;
  tiendas: TiendaDTO[] | undefined = [];
  tpvs: TpvDTO[] | undefined = [];

  configForm!: FormGroup;
  tiendasFC: FormControl;
  tpvsFC: FormControl;
  shop = '';
  tpv = '';

  constructor(private configService: ConfigService, 
              private router: Router, 
              private formBuilder: FormBuilder, 
              private authService: AuthService,
              private loginlogicoService: LoginlogicoService) { 
    this.tiendasFC = new FormControl(null, [Validators.required]);
    this.tpvsFC = new FormControl(null, [Validators.required]);
    this.configForm = this.formBuilder.group({
      tiendasFC: this.tiendasFC,
      tpvsFC: this.tpvsFC
    });
  }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.loadUserConfig();
    this.loadShops();
  }

  public async shopChange() {
    console.log("SHOP CHANGE :: " + this.tiendasFC.value);
    this.loadTPVs(this.tiendasFC.value);
  }

  private async loadShops(): Promise<void> {
    let errorResponse: any;
    try {
      this.tiendas = await this.configService.getTiendas();
      if(this.tiendas?.length == 1) {
        this.tiendasFC.setValue(this.tiendas[0].id);
      }
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private async loadTPVs(idTienda: String): Promise<void> {
    let errorResponse: any;
    try {
      this.tpvs = await this.configService.getTPVs(idTienda);
      if(this.tpvs?.length == 1) {
        this.tpvsFC.setValue(this.tpvs[0].id);
      }
      this.isLoadingResults = false;
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private async loadUserConfig(): Promise<void> {
    this.authService.loginLogico().subscribe((res) => {
      console.log("LOGIN LOGICO SUBSCRIBE :: " + JSON.stringify(res));
      console.log("LOGIN LOGICO SUBSCRIBE :: DOMINIO " + res[0].idDominioUsuario);
      this.loginlogicoService.saveDominio(res[0].idDominioUsuario);
      this.loginlogicoService.saveImageBasePath(res[0].imagenesWebBasePath);
    }, (err: any) => {
      console.log(err);
    });
  }

  public saveConfig() {
    let tiendaSeleccionada = this.tiendas?.find(tienda => tienda.id == this.tiendasFC.value);
    this.configService.saveConfig(this.tiendasFC.value, this.tpvsFC.value, tiendaSeleccionada?.codigo);
    this.router.navigate(['/tables']).then(_ => console.log('Config finish'));
  }

}
