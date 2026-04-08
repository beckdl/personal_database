import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about.component';
import { Account } from './account/account.component';
import { Files } from './files/files.component';
import { LoginComponent } from './login/login.component';
import { Notes } from './notes/notes.component';
import { HomeComponent } from './home/home.component';
import { FileEditComponent } from './files/file-edit/file-edit.component';
import { FileDetailsComponent } from './files/file-details/file-details.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteDetailsComponent } from './notes/note-details/note-details.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { RegisterComponent } from './register/register.component';
import { AccountDeleteComponent } from './account/account-delete/account-delete.component';



const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: About},
    {path: 'account', component: Account, children: [
        {path: 'edit', component: AccountEditComponent},
        {path: 'delete', component: AccountDeleteComponent}
    ]},
    {path: 'files', component: Files, children: [
        {path: 'new', component: FileEditComponent},
        {path: ':id', component: FileDetailsComponent},
        {path: ':id/edit', component: FileEditComponent}
    ]},
    {path: 'login', component: LoginComponent},
    {path: 'notes', component: Notes, children: [
        {path: 'new', component: NoteEditComponent},
        {path: ':id', component: NoteDetailsComponent},
        {path: ':id/edit', component: NoteEditComponent}
    ]},
    {path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}