import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { EditEmployeesModalComponent } from '../edit-employees-modal/edit-employees-modal.component';
import { AddEmployeesModalComponent } from '../add-employees-modal/add-employees-modal.component';
import { faPencilAlt, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.css'
})
export class EmployeesPageComponent {
  public users : any = [];
  faPencilAlt = faPencilAlt;
  faTrashAlt  = faTrashAlt;
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
  ){
    this.getUsers();
  }

  public getUsers(){
    this.apiProv.getUsers().then(res =>{
      this.users = res.data;
    })
  }

  public updateUser(user: any){
    const dialogRef = this.dialog.open(EditEmployeesModalComponent, {
      data: {
        new: false,
        userId: user._id,
        userName: user.userName,
        email: user.email,
        password: user.password,
        wShift: user.wShift,
        photo: user.photo,
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getUsers();
    });
  }

  public deleteUser(user: any){
    Swal.fire({
      showCancelButton: true,
      title: 'Desea eliminar el usuario: ' + user.userName + ' ?',
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`,
      background: '#fff',
      confirmButtonColor: '#008c45',
      cancelButtonColor: '#CD212A',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProv.deleteUser(user.userName)
          .then(
            (res) => {
              Swal.fire({
                title: "Usuario Eliminado",
                icon: "success",
                confirmButtonColor: '#008c45',
              });
              this.getUsers(); 
            }
          );
      }
    });
  }

  public registerUser() {
    const dialogRef = this.dialog.open(AddEmployeesModalComponent, {
      data: {
        new: true
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getUsers();
    });
}

  

}
