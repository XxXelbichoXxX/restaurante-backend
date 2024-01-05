import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-commands-page',
  templateUrl: './add-commands-page.component.html',
  styleUrls: ['./add-commands-page.component.css']
})
export class AddCommandsPageComponent {
  public newOrder: any = {
    numero_mesa: '',
    user_mesero: '',
    orden: [],
    total_orden: 0,
    status: 'Pendiente'
  };

  public selectedProduct: any = null;
  public quantity: number = 0;
  public products: any[] = [
    { nombre: 'Hamburguesa', precio: 135 },
    { nombre: 'Refresco', precio: 45 }
    // Puedes agregar más productos según sea necesario
  ];

  constructor(
    private apiProv: ApiProvider,
    public dialogRef: MatDialogRef<AddCommandsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addProductToOrder() {
    if (this.selectedProduct && this.quantity) {
      const newItem = {
        nombre_producto: this.selectedProduct.nombre,
        cantidad: this.quantity,
        precio_unitario: this.selectedProduct.precio
      };
      this.newOrder.orden.push(newItem);
      this.newOrder.total_orden += newItem.cantidad * newItem.precio_unitario;

      // Reinicia la selección después de agregar un producto
      this.selectedProduct = null;
      this.quantity = 0;
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Seleccione un producto y ingrese la cantidad',
        icon: 'error'
      });
    }
  }

  saveOrder() {
    this.apiProv.createCommands(this.newOrder)
      .then(
        (res) => {
          Swal.fire({
            title: 'Orden Agregada',
            icon: 'success'
          });
          this.dialogRef.close();
        })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error al agregar la orden',
          icon: 'error'
        });
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
