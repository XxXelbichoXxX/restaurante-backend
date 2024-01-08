import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { AddCommandsPageComponent } from '../add-commands-page/add-commands-page.component';
import { EditCommandsPageComponent } from '../edit-commands-page/edit-commands-page.component';
@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {
  public orders : any = [];
  public mesasD = [
    { id: 1, name: "Mesa 1" },
    { id: 2, name: "Mesa 2"},
    { id: 3, name: "Mesa 3" },
    { id: 4, name: "Mesa 4" },
    { id: 5, name: "Mesa 5" },
    { id: 6, name: "Mesa 6"},
    { id: 7, name: "Mesa 7" },
    { id: 8, name: "Mesa 8" },
    { id: 9, name: "Mesa 9" },
    { id: 10, name: "Mesa 10"},
    { id: 11, name: "Mesa 11" },
    { id: 12, name: "Mesa 12" },
  ]
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
    ) { this.getOrders(); }
    getOrders(){
      this.apiProv.getCommands().then(res =>{
        this.orders = res.data;
      })
    }
    hasPendingOrder(mesaId: number): boolean {
      return this.orders.some((order: any) => order.numero_mesa === mesaId && order.status === 'Pendiente');
    }
}
