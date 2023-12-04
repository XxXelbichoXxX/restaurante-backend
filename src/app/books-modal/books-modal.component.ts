import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books-modal',
  templateUrl: './books-modal.component.html',
  styleUrl: './books-modal.component.css'
})
export class BooksModalComponent {
  public new = true;
  public bookId = "";
  public titulo = "";
  public autor = "";
  public isbn = "";
  public genero = "";
  public precio = "";
  public stock = "";
  public img = "";

  constructor(
    public dialogRef: MatDialogRef<BooksModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ) {
    this.new = data.new;
    this.bookId = data.bookId;
    this.titulo = data.titulo;
    this.autor = data.autor;
    this.isbn = data.isbn;
    this.genero = data.genero;
    this.precio = data.precio;
    this.stock = data.stock;
    this.img = data.img;
  }

  public createBook() {
    const data = {
      titulo: this.titulo,
      autor: this.autor,
      isbn: this.isbn,
      genero: this.genero,
      precio: this.precio,
      stock: this.stock,
      img: this.img
    }
    this.apiProv.createBook(data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Libro Creado",
            icon: "success"
          });
          this.onClose()
        }
      }
    );
  }

  public updateBook(): void {
    const data = {
      titulo: this.titulo,
      autor: this.autor,
      isbn: this.isbn,
      genero: this.genero,
      precio: this.precio,
      stock: this.stock,
      img: this.img
    }

    this.apiProv.updateBook(this.bookId, data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Libro Actualizado",
            icon: "success"
          });
          this.onClose()
        }
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }

}