import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ApiProvider{
    url = environment.apiURL;

    getBooks(): Promise<any>{
        return new Promise((resolve, reject)=>{
            axios.get(this.url+'books').then(res =>{
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        })
    }
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
    createBook(data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject)=>{
            axios.post(this.url+'books',data,{
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
    updateBook(bookID: any,data: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject)=>{
            axios.put(this.url+'books/'+ bookID,data,{
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
    deleteBook(bookID: any): Promise<any>{
        const token = localStorage.getItem("token");
        return new Promise((resolve, reject)=>{
            axios.delete(this.url+'books/'+ bookID,{
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
}