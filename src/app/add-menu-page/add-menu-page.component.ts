import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-menu-page',
  templateUrl: './add-menu-page.component.html',
  styleUrl: './add-menu-page.component.css'
})
export class AddMenuPageComponent {
  public new = true;
  public id = "";
  public saucer_name = "";
  public category = "";
  public description = "";
  public price = 0;
  constructor (
    public dialogRef: MatDialogRef<AddMenuPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ){
  
  }

  public addProduct(){
    if (!this.id || !this.saucer_name || !this.category || !this.description || !this.price) {
      Swal.fire({
        title: "Complete todos los campos",
        icon: "error"
      });
      console.error('Todos los campos son obligatorios');
      return;
  }
  const data = {
    id: this.id,
    saucer_name: this.saucer_name,
    category: this.category,
    description: this.description,
    price: this.price
  }
  this.apiProv.addProduct(data).then(res =>{
    if(res){
      Swal.fire({
        title: "Producto Creado",
        icon: "success"
      });
      this.dialogRef.close();
      console.log(data)
    }
  })
  }

  onClose(): void{
    this.dialogRef.close();
  }
}

