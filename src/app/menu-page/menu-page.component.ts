import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { AddMenuPageComponent } from '../add-menu-page/add-menu-page.component';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.css'
})
export class MenuPageComponent {
  public products: any = [];
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
  ){
    this.getProducts();
  }

  public getProducts(){
    this.apiProv.getProducts().then(res =>{
      this.products = res.data;
    })
  }
  public addProduct(){
    const dialogRef = this.dialog.open(AddMenuPageComponent, {
      data: {
        new: true
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getProducts();
    });
  }

  public logout(){
    this.apiProv.logout();
    window.location.href = '/login';
  }

  getBebidas(): any[]{
    return this.products.filter((product: any) => product.category === 'Bebida');
  }
  getPizzas(): any[]{
    return this.products.filter((product: any) => product.category === 'Pizza');
  }
  getPastas(): any[]{
    return this.products.filter((product: any) => product.category === 'Pasta');
  }
}
