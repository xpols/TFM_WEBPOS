import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Services/config.service';
import { TiendaDTO } from '../../models/tienda.dto';
import { TpvDTO } from 'src/app/models/tpv.dto';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginlogicoService } from 'src/app/Services/loginlogico.service';
import { LocalStorageConstants } from 'src/app/constants/constants';
import { CanalesVentaDTO } from 'src/app/models/canalesVenta.dto';

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
  canalesVenta: CanalesVentaDTO[] | undefined = [];

  tienda: TiendaDTO | undefined;

  configForm!: FormGroup;
  tiendasFC: FormControl;
  tpvsFC: FormControl;
  canalesFC: FormControl;
  shop = '';
  tpv = '';
  canalVenta = '';

  constructor(private configService: ConfigService, 
              private router: Router, 
              private formBuilder: FormBuilder, 
              private authService: AuthService,
              private loginlogicoService: LoginlogicoService) { 
    this.tiendasFC = new FormControl(null, [Validators.required]);
    this.tpvsFC = new FormControl(null, [Validators.required]);
    this.canalesFC = new FormControl(null, [Validators.required]);
    this.configForm = this.formBuilder.group({
      tiendasFC: this.tiendasFC,
      tpvsFC: this.tpvsFC,
      canalesFC: this.canalesFC
    });
  }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.loadUserConfig();
    this.loadShops();
    let idTiendaLS = localStorage.getItem(LocalStorageConstants.ID_TIENDA);
    if(idTiendaLS!=null) {
      this.tiendasFC.setValue(Number(idTiendaLS));
      this.shopChange();
    } else {
      this.isLoadingResults = false;
    }
  }

  public async shopChange() {
    console.log("SHOP CHANGE :: " + this.tiendasFC.value);
    await this.loadShop();
    console.log("SHOP COMPLETE :: " + this.tienda);
    this.loadTPVs(this.tiendasFC.value);
    let idTPVLS = localStorage.getItem(LocalStorageConstants.ID_TPV);
    if(idTPVLS!=null) {
      this.tpvsFC.setValue(Number(idTPVLS));
    } else {
      this.isLoadingResults = false;
    }

    this.loadCanales();
    let idCanalLS = localStorage.getItem(LocalStorageConstants.ID_CANAL_VENTA);
    if(idCanalLS!=null) {
      this.canalesFC.setValue(Number(idCanalLS));
    }
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

  private async loadShop(): Promise<void> {
    let errorResponse: any;
    try {
      this.tienda = await this.configService.getTienda(this.tiendasFC.value);
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
      //this.isLoadingResults = false;
    } catch (error: any) {
      errorResponse = error.error;
    }
  }

  private async loadCanales(): Promise<void> {
    let errorResponse: any;
    try {
      this.canalesVenta = await this.configService.getCanalesVenta();
      this.canalesVenta = this.canalesVenta?.filter(canal => {
        let canalEncontrado = this.tienda?.canalesVenta?.find(canalTienda => canal.id == canalTienda.id);
        return canalEncontrado != undefined;
      })
      if(this.canalesVenta?.length == 1) {
        this.canalesFC.setValue(this.canalesVenta[0].id);
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
    this.configService.saveConfig(this.tiendasFC.value, this.tpvsFC.value, tiendaSeleccionada?.codigo, this.canalesFC.value);
    this.configService.saveInfoComplementaria(this.tienda, this.canalesVenta);
    this.router.navigate(['/tables']).then(_ => console.log('Config finish'));
  }

}
