import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private _userNameKey = 'user_name';
  public userName: string = '';

  constructor() {
    const storedUserName = localStorage.getItem(this._userNameKey);
    if (storedUserName) {
      this.userName = storedUserName;
    }
  }
  
  public setUser(userName: string) {
    this.userName = userName;
    localStorage.setItem(this._userNameKey, userName);
  }

  public getUser() {
    return this.userName;
  }
}
