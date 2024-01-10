import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';
import { UserService } from '../services/user-service.service';

interface Producto {
  id: string;
  saucer_name: string;
  price: number;
}

@Component({
  selector: 'app-add-commands-page',
  templateUrl: './add-commands-page.component.html',
  styleUrls: ['./add-commands-page.component.css']
})
export class AddCommandsPageComponent{

  public new = true;
  public _id = '';
  public numero_mesa = 0;
  public user_mesero = "";
  public users: any[] = [];
  public orden: any[] = [];
  public productos: Producto[] = [];
  public nombre_producto: string = "";
  public cantidad = 0;
  public precio_unitario = 0;
  public status = "";
  public orders: any[] = [];
  userName : string = '';
  _userNameKey = 'user_name';
  role: string = '';
  


  constructor(
    public dialogRef: MatDialogRef<AddCommandsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider,
    private userService: UserService
  ) {
    this.getProducts();
    this.getUsers();
    this.getInfo(this.userService.getUser());
    this.initializeOrder();


  }
  getInfo(userName: any) {
    this.apiProv.getUserInfo(userName).then(res => {
      console.log(res);
      this.user_mesero = res.userName;
    });
  }
  private initializeOrder() {
    // Si estás editando una orden existente, carga los datos existentes
    if (!this.data.new) {
      this.numero_mesa = this.data.id;
      this._id = this.generateRandomId();
    }
  }

  public createOrder() {
    
    if (!this._id || !this.numero_mesa || !this.user_mesero || !this.status || !this.orden) {
      Swal.fire({
        title: "Complete todos los campos",
        icon: "error",
        confirmButtonColor: '#008c45'
      });
      console.error('Todos los campos son obligatorios');
      return;
    }

    // Filtrar los productos para quitar aquellos con nombre_producto vacío
    const filteredOrden = this.orden.filter(product => product.nombre_producto.trim() !== '');

    
    const data = {
      _id: this._id,
      numero_mesa: this.numero_mesa,
      user_mesero: this.user_mesero,
      orden: filteredOrden,  // Usar el arreglo filtrado
      status: this.status,
    };

    console.log(data);

    // Verificar si hay al menos un producto en la orden antes de enviar la solicitud
    if (filteredOrden.length > 0) {
      this.apiProv.createCommands(data)
        .then(
          (res) => {
            if (res) {
              Swal.fire({
                title: "Orden Creada",
                icon: "success",
                confirmButtonColor: '#008c45'
              });
              this.onClose();
            }
          }
        );
    } else {
      Swal.fire({
        title: "La orden debe tener al menos un producto",
        icon: "error",
        confirmButtonColor: '#008c45',
      });
      console.error('La orden debe tener al menos un producto');
    }
  }
  private generateRandomId(): string {
    // Generar un número aleatorio entre 1000 y 9999
    const randomId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return randomId.toString();
  }

 

  addProduct() {
    if (!this.nombre_producto || !this.cantidad) {
      Swal.fire({
        title: 'Complete todos los campos',
        icon: 'error',
        confirmButtonColor: '#008c45'
      });
      console.error('Todos los campos son obligatorios');
      return;
    }

    const newProduct = {
      nombre_producto: this.nombre_producto,
      cantidad: this.cantidad,
      precio_unitario: this.precio_unitario
    };

    if (newProduct.nombre_producto.trim() !== '') {
      // Agrega el nuevo producto al array 'orden'
      this.orden = [...this.orden, newProduct];
    }

    this.nombre_producto = '';
    this.cantidad = 0;
    this.precio_unitario = 0;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  public getProducts() {
    this.apiProv.getProducts().then(res => {
      this.productos = res.data;
    });
  }

  public getUsers() {
    this.apiProv.getUsers().then(res => {
      this.users = res.data;
    })
  }
  getProductPriceById(productId: string): number {
    const product = this.productos.find(p => p.id === productId);
    return product ? product.price : 0;
  }

  onProductSelected() {
    // Buscar el producto seleccionado en el array de productos
    const selectedProduct = this.productos.find(p => p.saucer_name === this.nombre_producto);

    // Actualizar el precio_unitario si se ha encontrado el producto
    if (selectedProduct) {
      this.precio_unitario = selectedProduct.price;
    } else {
      // Si no se encuentra el producto, puedes manejarlo como desees (por ejemplo, dejar el precio_unitario en cero)
      this.precio_unitario = 0;
    }
  }


}
