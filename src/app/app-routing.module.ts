import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about.component';
import { Account } from './account/account.component';
import { Files } from './files/files.component';
import { LoginComponent } from './login/login.component';
import { Notes } from './notes/notes.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: About},
    {path: 'account', component: Account},
    {path: 'files', component: Files},
    {path: 'login', component: LoginComponent},
    {path: 'notes', component: Notes}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}