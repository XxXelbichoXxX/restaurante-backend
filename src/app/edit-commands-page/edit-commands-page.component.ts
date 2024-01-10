// edit-commands-page.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

interface Producto {
  id: string;
  saucer_name: string;
  price: number;
}

@Component({
  selector: 'app-edit-commands-page',
  templateUrl: './edit-commands-page.component.html',
  styleUrls: ['./edit-commands-page.component.css']
})
export class EditCommandsPageComponent {
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

  constructor(
    public dialogRef: MatDialogRef<EditCommandsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ) {
    this.getProducts();
    this.getUsers();
    this.initializeOrder();
  }

  private initializeOrder() {
    // Si estás editando una orden existente, carga los datos existentes
    if (!this.data.new) {
      this._id = this.data._id;
      this.numero_mesa = this.data.numero_mesa;
      this.user_mesero = this.data.user_mesero;
      this.orden = [...this.data.orden]; // Asegura una copia independiente
      this.status = this.data.status;
    }
  }

  public updateOrder() {
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
    const filteredOrden = this.orden.filter(product => product.nombre_producto.trim() !== '' );

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
      this.apiProv.updateCommands(this._id, data)
        .then(
          (res) => {
            if (res) {
              Swal.fire({
                title: "Orden Actualizada",
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
        confirmButtonColor: '#008c45'
      });
      console.error('La orden debe tener al menos un producto');
    }
  }

  addProduct() {
    if (!this.nombre_producto || !this.cantidad || !this.precio_unitario) {
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

    this.clearProductFields();
  }

  removeProduct(index: number) {
    this.orden.splice(index, 1);
  }

  private clearProductFields() {
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
    });
  }

  getProductPriceById(productId: string): number {
    const product = this.productos.find(p => p.id === productId);
    return product ? product.price : 0;
  }

  onProductSelected(index: number) {
    // Buscar el producto seleccionado en el array de productos
    const selectedProduct = this.productos.find(p => p.saucer_name === this.orden[index].nombre_producto);

    // Actualizar el precio_unitario si se ha encontrado el producto
    if (selectedProduct) {
      this.orden[index].precio_unitario = selectedProduct.price;
    } else {
      // Si no se encuentra el producto, puedes manejarlo como desees (por ejemplo, dejar el precio_unitario en cero)
      this.orden[index].precio_unitario = 0;
    }
  }

  ProductSelected() {
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
