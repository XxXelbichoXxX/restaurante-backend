import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  public userName: string = '';

  constructor() {}
  
  public setUser(userName: string) {
    this.userName = userName;
  }

  public getUser() {
    return this.userName;
  }
}
