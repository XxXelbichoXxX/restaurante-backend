import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddCommandsPageComponent } from './add-commands-page/add-commands-page.component';
import { AddEmployeesPageComponent } from './add-employees-page/add-employees-page.component';
import { AddMenuPageComponent } from './add-menu-page/add-menu-page.component';
import { CommandsPageComponent } from './commands-page/commands-page.component';
import { EditCommandsPageComponent } from './edit-commands-page/edit-commands-page.component';
import { EditMenuPageComponent } from './edit-menu-page/edit-menu-page.component';
import { EdiEmployeesPageComponent } from './edi-employees-page/edi-employees-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
const routes: Routes = [
  {path: 'login',component: LoginPageComponent},
  {path: 'employees',component: EmployeesPageComponent},
  {path: 'commands',component: CommandsPageComponent},
  {path: 'menu',component: MenuPageComponent},
  {path: 'add-employees',component: AddEmployeesPageComponent},
  {path: 'edi-employees',component: EdiEmployeesPageComponent},
  {path: 'add-commands',component: AddCommandsPageComponent},
  {path: 'edit-commands',component: EditCommandsPageComponent},
  {path: 'add-menu',component: AddMenuPageComponent},
  {path: 'edit-menu',component: EditMenuPageComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
