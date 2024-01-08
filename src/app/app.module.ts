import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { CommandsPageComponent } from './commands-page/commands-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { AddCommandsPageComponent } from './add-commands-page/add-commands-page.component';
import { EditCommandsPageComponent } from './edit-commands-page/edit-commands-page.component';
import { AddMenuPageComponent } from './add-menu-page/add-menu-page.component';
import { EditMenuPageComponent } from './edit-menu-page/edit-menu-page.component';
import { EditEmployeesModalComponent } from './edit-employees-modal/edit-employees-modal.component';
import { AddEmployeesModalComponent } from './add-employees-modal/add-employees-modal.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MesasComponent } from './mesas/mesas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EmployeesPageComponent,
    CommandsPageComponent,
    MenuPageComponent,
    AddCommandsPageComponent,
    EditCommandsPageComponent,
    AddMenuPageComponent,
    EditMenuPageComponent,
    EditEmployeesModalComponent,
    AddEmployeesModalComponent,
    HeaderComponent,
    FooterComponent,
    MesasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
