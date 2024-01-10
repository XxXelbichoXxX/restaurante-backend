import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { AddCommandsPageComponent } from '../add-commands-page/add-commands-page.component';
import { EditCommandsPageComponent } from '../edit-commands-page/edit-commands-page.component';
import { UserService } from '../services/user-service.service';
import { Router } from '@angular/router'
import { faPencilAlt, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-commands-page',
  templateUrl: './commands-page.component.html',
  styleUrl: './commands-page.component.css'
})
export class CommandsPageComponent {
  public orders : any [] = [];
  public sortOrderAsc = false;
  faPencilAlt = faPencilAlt;
  faTrashAlt  = faTrashAlt;
  role: string = '';
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog,
    private userService: UserService,
    private Router: Router
  ){
    this.getOrders();
    this.getInfo(this.userService.getUser());
  }
  getInfo(userName: any) {
    this.apiProv.getUserInfo(userName).then(res => {
      this.role = res.role;
      console.log(this.role);
      if(this.role !== 'Administrador' && this.role !== 'Empleado'){
      this.Router.navigate(['/menu']);
    }
    });
  }
  
  public logout(){
    this.apiProv.logout();
    window.location.href = '/login';
  }
  getOrders(){
    this.apiProv.getCommands().then(res =>{
      this.orders = res.data;
    })
  }
  registerOrder(){
    const dialogRef = this.dialog.open(AddCommandsPageComponent,{
      data: {
        new: true
      }
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getOrders();
    })
  }
  updateOrder(order: any) {
    const dialogRef = this.dialog.open(EditCommandsPageComponent, {
      data: order,  // Aquí pasas toda la orden al diálogo
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getOrders();
    });
  }
  

  deleteOrder(order: any){
    Swal.fire({
      showCancelButton: true,
      title: 'Desea eliminar la orden: ' + order._id + ' ?',
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`,
      confirmButtonColor: '#008c45',
      cancelButtonColor: '#CD212A'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProv.deleteCommands(order._id)
          .then(
            (res) => {
              Swal.fire({
                title: "Orden Eliminada",
                icon: "success",
                confirmButtonColor: '#008c45'
              });
              this.getOrders(); 
            }
          );
      }
    });
  }

  sortOrdersByDateTime() {
    // Cambia el estado de ordenación al presionar el botón
    this.sortOrderAsc = !this.sortOrderAsc;

    this.orders.sort((a: any, b: any) => {
      const dateA = new Date(a.fecha).getTime();
      const dateB = new Date(b.fecha).getTime();

      if (this.sortOrderAsc) {
        return dateA - dateB; // Orden ascendente (más antiguo primero)
      } else {
        return dateB - dateA; // Orden descendente (más reciente primero)
      }
    });
  }
}