import { Component} from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { UserService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public userName: string = '';
  public password: string = '';


  constructor(private apiProv: ApiProvider, private userService: UserService, private router: Router) {
    if (apiProv.isAunthenticatedUSer()) {
      router.navigate(['/menu']);
      console.log('Inicio de sesión');
    }
  }

  public login() {
    const data = {
      userName: this.userName,
      password: this.password,
    };
    
    this.apiProv.login(data).then(res => {
      console.log(res);
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.userService.userName = this.userName;
        this.router.navigate(['/menu']);
      }
    });
  }


}
