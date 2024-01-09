import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   userName: string = '';
   photo: string = '';
   role: string = '';

  constructor(private apiProv: ApiProvider) {
    this.getInfo("bicho");
  }

  getInfo(userName: any) {
    this.apiProv.getUserInfo(userName).then(res => {
      console.log(res);
      this.userName = res.userName;
      this.photo = res.photo;
      this.role = res.role;
    });
    
  }

  public logout() {
    this.apiProv.logout();
    window.location.href = '/login';
  }

}

