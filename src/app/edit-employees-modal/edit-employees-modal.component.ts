import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-employees-modal',
  templateUrl: './edit-employees-modal.component.html',
  styleUrl: './edit-employees-modal.component.css'
})
export class EditEmployeesModalComponent {
  public new = true;
  public userId = "";
  public userName = "";
  public email = "";
  public password = "";
  public wShift = "";
  public photo = "";
  constructor(
    public dialogRef: MatDialogRef<EditEmployeesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ) {
    this.new = data.new;
    this.userId = data.userId;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.wShift = data.wShift;
    this.photo = data.photo;
  }

  onClose(): void{
    this.dialogRef.close();
  }

  public updateUser(): void {
    const data = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      wShift: this.wShift,
      photo: this.photo
    }

    this.apiProv.updateUser(this.userName, data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Usuario Actualizado",
            icon: "success"
          });
          this.onClose()
        }
      }
    );
  }
}
