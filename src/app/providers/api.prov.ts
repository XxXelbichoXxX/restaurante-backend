import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiProvider {
  url = environment.apiURL;

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'users')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users/login', data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  isAunthenticatedUSer(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
  logout() {
    localStorage.removeItem('token');
  }
  register(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  createUser(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'users', data, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  updateUser(userName: any, data: any): Promise<any> {
    console.log('userName:', userName);
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .put(this.url + 'users/' + userName, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  deleteUser(userName: any): Promise<any> {
    const token = localStorage.getItem('token');
    console.log('Deleting user with userName:', userName); // Agregar esta línea

    return new Promise((resolve, reject) => {
      // Verifica si userName está definido
      if (!userName) {
        console.error('Error: userName is undefined');
        reject('Error: userName is undefined');
        return;
      }

      axios
        .delete(this.url + 'users/' + userName, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log('Response from backend:', res.data);
          resolve(res.data);
        })
        .catch((err) => {
          console.log('Error from backend:', err);
          reject(err);
        });
    });
  }

  /* PRODUCS MENU */
  getProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'products')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  addProduct(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'products', data, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  //Ordenes
  getCommands(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'orders')
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  createCommands(data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .post(this.url + 'orders', data, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  updateCommands(orderId: any, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .put(this.url + 'orders/' + orderId, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  deleteCommands(orderId: any): Promise<any> {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      axios
        .delete(this.url + 'orders/' + orderId, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
