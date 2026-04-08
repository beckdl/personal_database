import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app.component';
import { Header } from './header/header.component';
import { Files } from './files/files.component';
import { Notes } from './notes/notes.component';
import { About } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { Account } from './account/account.component';
import { AppRoutingModule } from './app-routing.module';
import { DropdownDirective } from './dropdown.directive';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FileEditComponent } from './files/file-edit/file-edit.component';
import { FileDetailsComponent } from './files/file-details/file-details.component';
import { FileItemComponent } from './files/file-item/file-item.component';
import { FileListComponent } from './files/file-list/file-list.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteDetailsComponent } from './notes/note-details/note-details.component';
import { NoteItemComponent } from './notes/note-item/note-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { RegisterComponent } from './register/register.component';
import { AccountDeleteComponent } from './account/account-delete/account-delete.component';

@NgModule({
  declarations: [
    App,
    Header,
    Files,
    Notes,
    About,
    LoginComponent,
    Account,
    DropdownDirective,
    HomeComponent,
    FooterComponent,
    FileEditComponent,
    FileDetailsComponent,
    FileItemComponent,
    FileListComponent,
    NoteListComponent,
    NoteEditComponent,
    NoteDetailsComponent,
    NoteItemComponent,
    AccountEditComponent,
    RegisterComponent,
    AccountDeleteComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
