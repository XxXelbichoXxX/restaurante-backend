import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(  private apiProv: ApiProvider ) {

}
public logout(){
  this.apiProv.logout();
  window.location.href = '/login';
}
}

