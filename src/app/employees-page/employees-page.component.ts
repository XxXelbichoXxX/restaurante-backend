import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { EditEmployeesModalComponent } from '../edit-employees-modal/edit-employees-modal.component';
import { AddEmployeesModalComponent } from '../add-employees-modal/add-employees-modal.component';
import { faPencilAlt, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user-service.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.css'
})
export class EmployeesPageComponent {
  public users : any = [];
  faPencilAlt = faPencilAlt;
  faTrashAlt  = faTrashAlt;
  role: string = '';
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog,
    private userService: UserService,
    private Router: Router
  ){
    this.getUsers();
    this.getInfo(this.userService.getUser());


  }
  getInfo(userName: any) {
    this.apiProv.getUserInfo(userName).then(res => {
      this.role = res.role;
      if(this.role !== 'Administrador'){
        this.Router.navigate(['/menu']);
      }
    });
    
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
        role: user.role
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
