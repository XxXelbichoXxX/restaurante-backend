import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { CommandsPageComponent } from './commands-page/commands-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { AddEmployeesPageComponent } from './add-employees-page/add-employees-page.component';
import { EdiEmployeesPageComponent } from './edi-employees-page/edi-employees-page.component';
import { AddCommandsPageComponent } from './add-commands-page/add-commands-page.component';
import { EditCommandsPageComponent } from './edit-commands-page/edit-commands-page.component';
import { AddMenuPageComponent } from './add-menu-page/add-menu-page.component';
import { EditMenuPageComponent } from './edit-menu-page/edit-menu-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EmployeesPageComponent,
    CommandsPageComponent,
    MenuPageComponent,
    AddEmployeesPageComponent,
    EdiEmployeesPageComponent,
    AddCommandsPageComponent,
    EditCommandsPageComponent,
    AddMenuPageComponent,
    EditMenuPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
