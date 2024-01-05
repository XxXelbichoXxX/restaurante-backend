import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ApiProvider{
    url = environment.apiURL;

    //Autenticacion de usuarios
    login(data:any) : Promise<any>{
        return new Promise((resolve, reject)=>{
            axios.post(this.url+'users/login',data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
        });
    }

    isAunthenticatedUSer(): boolean{
        const token = localStorage.getItem("token");
        return token ? true: false;
    }
    logout(){
        localStorage.removeItem("token");
    }

    //Usuarios
    getUsers(): Promise<any>{
        return new Promise((resolve, reject)=>{
            axios.get(this.url+'users').then(res =>{
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        })
    }
    register(data:any): Promise<any>{
        return new Promise((resolve, reject)=>{
            axios.post(this.url+'users').then(res =>{
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        })
    }
    createUser(data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject)=>{
            axios.post(this.url+'users',data,{
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
    updateUser(userName: any,data: any): Promise<any>{
        console.log("userName:", userName);
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject)=>{
            axios.put(this.url+'users/'+ userName, data,{
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
    deleteUser(userName: any): Promise<any> {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios.delete(this.url+'users/' + userName, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }
    
    //Ordenes
    getCommands(): Promise<any>{
        return new Promise((resolve, reject)=>{
            axios.get(this.url+'orders').then(res =>{
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        })
    }

    createCommands(data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject)=>{
            axios.post(this.url+'orders',data,{
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
    updateCommands(orderId: any,data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject)=>{
            axios.put(this.url+'orders/'+orderId,data,{
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

    deleteCommands(orderId: any): Promise<any> {
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios.delete(this.url + 'orders/' + orderId, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }
}