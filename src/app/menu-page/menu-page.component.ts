import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { AddMenuPageComponent } from '../add-menu-page/add-menu-page.component';
import { EditMenuPageComponent } from '../edit-menu-page/edit-menu-page.component';
import Swal from 'sweetalert2'
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.css'
})
export class MenuPageComponent {
  public products: any = [];
  role: string = '';
  _userNameKey = 'user_name';

  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.getProducts();
    this.getInfo(this.userService.getUser());
  }
  getInfo(userName: any) {
    this.apiProv.getUserInfo(userName).then(res => {
      this.role = res.role;
    });

  }

  public getProducts() {
    this.apiProv.getProducts().then(res => {
      this.products = res.data;
    })
  }
  public addProduct() {
    const dialogRef = this.dialog.open(AddMenuPageComponent, {
      data: {
        new: true
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getProducts();
    });
  }
  public updateProduct(product: any) {
    const dialogRef = this.dialog.open(EditMenuPageComponent, {
      data: {
        new: false,
        id: product.id,
        saucer_name: product.saucer_name,
        category: product.category,
        description: product.description,
        price: product.price,
        photo: product.photo
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getProducts();
    });
  }
  public opcionesPage(product: any) {
    if (this.role === 'Administrador') {
      Swal.fire({
        showCancelButton: true,
        title: '¿Que desea hacer con el producto: ' + product.saucer_name + ' ?',
        confirmButtonText: "Editar",
        cancelButtonText: `Eliminar`,
        background: '#fff',
        confirmButtonColor: '#008c45',
        cancelButtonColor: '#CD212A',
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateProduct(product);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.apiProv.deleteProduct(product.id)
            .then(
              (res) => {
                Swal.fire({
                  title: "Producto Eliminado",
                  icon: "success",
                  confirmButtonColor: '#008c45',
                });
                this.getProducts();
              }
            );
        }
      });
    }

  }

  public logout() {
    this.apiProv.logout();
    window.location.href = '/login';
  }

  getBebidas(): any[] {
    return this.products.filter((product: any) => product.category === 'Bebida');
  }
  getPizzas(): any[] {
    return this.products.filter((product: any) => product.category === 'Pizza');
  }
  getPastas(): any[] {
    return this.products.filter((product: any) => product.category === 'Pasta');
  }
}
