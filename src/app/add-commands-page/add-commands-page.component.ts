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
  public new = true;
  public userName = "";
  public email = "";
  public password = "";
  public wShift = "";
  public photo = "";
  public No_Orden=0;
  public Mesa=0;
  public Mesero="";
  public Status="";
  public orden = [];
  constructor(
    public dialogRef: MatDialogRef<AddCommandsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ) {}

  public createOrder() {
    if (!this.No_Orden || !this.Mesa || !this.Mesero || !this.Status || !this.orden) {
      Swal.fire({
        title: "Complete todos los campos",
        icon: "error"
      });
      console.error('Todos los campos son obligatorios');
      return;
  }
  
    const data = {
      No_Orden: this.No_Orden,
      Mesa: this.Mesa,
      Mesero: this.Mesero,
      Status: this.Status,
      orden: this.orden
    }
    this.apiProv.createUser(data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Usuario Creado",
            icon: "success"
          });
          this.onClose()
        }
      }
    );
  }
  
  onClose(): void{
    this.dialogRef.close();
  }
  
  }
  