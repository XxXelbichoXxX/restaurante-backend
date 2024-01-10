import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ApiProvider {
  url = environment.apiURL;
  public currentUser: any;

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
  getUserInfo(userName: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'users/' + userName)
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
          this.currentUser = res.data.userName; 
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
    localStorage.removeItem('userName');
    this.currentUser = null;
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
    updateProduct(id: any,data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject)=>{
            axios.put(this.url+'products/'+ id, data,{
                headers : {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    deleteProduct(id: any): Promise<any> {
        const token = localStorage.getItem("token");
    
        return new Promise((resolve, reject) => {
            // Verifica si userName está definido
            if (!id) {
                console.error("Error: Product is undefined");
                reject("Error: Product is undefined");
                return;
            }
    
            axios.delete(this.url + 'products/' + id, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                console.log("Response from backend:", res.data);
                resolve(res.data);
            }).catch(err => {
                console.log("Error from backend:", err);
                reject(err);
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
            console.error(err);
          
            if (err.response) {
              console.log('Código de estado HTTP:', err.response.status);
              console.log('Respuesta del servidor:', err.response.data);
            }
          
            if (err.response || err.response.status === 400) {
              reject('El nombre de usuario o correo electrónico ya está en uso.');
            } else {
              reject('Error al crear el usuario. Por favor, inténtalo de nuevo más tarde.');
            }
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

  getProductById(productId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url + 'products/' + productId)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
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
          Swal.fire({
            title: 'Error al crear la orden',
            icon: 'error'
          })
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
