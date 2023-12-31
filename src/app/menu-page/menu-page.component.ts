import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.css'
})
export class MenuPageComponent {
  constructor(
    private apiProv: ApiProvider,
  ){
  
  }

  public logout(){
    this.apiProv.logout();
    window.location.href = '/login';
  }
}
