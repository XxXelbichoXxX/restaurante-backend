import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-menu-page',
  templateUrl: './edit-menu-page.component.html',
  styleUrl: './edit-menu-page.component.css'
})
export class EditMenuPageComponent {
  public new = true;
  public id = "";
  public saucer_name = "";
  public category = "";
  public description = "";
  public price = 0;
  public photo = "";
  constructor (
    public dialogRef: MatDialogRef<EditMenuPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ){
    this.new = data.new;
    this.id = data.id;
    this.saucer_name = data.saucer_name;
    this.category = data.category;
    this.description = data.description;
    this.price = data.price;
    this.photo = data.photo;
  }

  onClose(): void{
    this.dialogRef.close();
  }
  public updateProduct() : void{
    const data = {
      id: this.id,
      saucer_name: this.saucer_name,
      category: this.category,
      description: this.description,
      price: this.price,
      photo: this.photo
    }
    this.apiProv.updateProduct(this.id, data).then(res =>{
      if(res){
        Swal.fire({
          title: "Producto Actualizado",
          icon: "success",
          confirmButtonColor: '#008c45',
        })
        this.onClose();
      }
    })
  }
}
