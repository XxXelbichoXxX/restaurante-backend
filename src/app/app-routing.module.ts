import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { BooksPageComponent } from './books-page/books-page.component';
const routes: Routes = [
  {path: 'login',component: LoginPageComponent},
  {path: 'register',component: RegisterPageComponent},
  {path: 'books',component: BooksPageComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
