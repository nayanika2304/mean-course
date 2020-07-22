import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms"
import {MatInputModule} from "@angular/material/input"
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/posts-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {HeaderComponent} from "./header/header.component";
import {PostListComponent} from "./posts/posts-list/post-list.component";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
