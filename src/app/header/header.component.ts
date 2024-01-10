import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { UserService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   userName : string = '';
   photo: string = '';
   role: string = '';
   _userNameKey = 'user_name';
  constructor(private apiProv: ApiProvider, private userService: UserService, private Router: Router) {
    this.getInfo(this.userService.getUser());
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
    this.Router.navigate(['/login']);
  }

}

