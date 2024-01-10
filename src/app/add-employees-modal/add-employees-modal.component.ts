import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employees-modal',
  templateUrl: './add-employees-modal.component.html',
  styleUrl: './add-employees-modal.component.css'
})
export class AddEmployeesModalComponent {
  public new = true;
  public userName = "";
  public email = "";
  public password = "";
  public wShift = "";
  public photo = "";
  public role = "";

constructor (
  public dialogRef: MatDialogRef<AddEmployeesModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private apiProv: ApiProvider
){

}

public createUser() {

  if (!this.userName || !this.email || !this.password || !this.wShift || !this.photo || !this.role) {
    Swal.fire({
      title: "Complete todos los campos",
      icon: "error"
    });
    console.error('Todos los campos son obligatorios');
    return;
}

  const data = {
    userName: this.userName,
    email: this.email,
    password: this.password,
    wShift: this.wShift,
    photo: this.photo,
    role: this.role
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
