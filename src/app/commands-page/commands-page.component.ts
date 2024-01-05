import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { EditEmployeesModalComponent } from '../edit-employees-modal/edit-employees-modal.component';
import { AddEmployeesModalComponent } from '../add-employees-modal/add-employees-modal.component';
import { AddCommandsPageComponent } from '../add-commands-page/add-commands-page.component';

@Component({
  selector: 'app-commands-page',
  templateUrl: './commands-page.component.html',
  styleUrl: './commands-page.component.css'
})
export class CommandsPageComponent {
  public orders : any = [];
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
  ){
    this.getOrders();
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
    const dialogRef = this.dialog.open(AddCommandsPageComponent, {
      data: {
        new: true
      }
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getOrders();
    })
  }
  updateOrder(order: any){
    
  }
  deleteOrder(order: any){
    Swal.fire({
      showCancelButton: true,
      title: 'Desea eliminar la orden: ' + order._id + ' ?',
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProv.deleteCommands(order._id)
          .then(
            (res) => {
              Swal.fire({
                title: "Orden Eliminada",
                icon: "success"
              });
              this.getOrders(); 
            }
          );
      }
    });
  }

}