import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentSocialComponent } from './student-social/student-social.component';
import { MenuComponent } from './student-social/menu/menu.component';
import { MainBoardComponent } from './student-social/main-board/main-board.component';
import { SubjectListComponent } from './student-social/main-board/subject-list/subject-list.component';
import { SubjectMainComponent } from './student-social/main-board/subject-main/subject-main.component';
import { SubjectComponent } from './student-social/main-board/subject-list/subject/subject.component';
import { CreatePostComponent } from './student-social/main-board/subject-main/create-post/create-post.component';
import { PostListComponent } from './student-social/main-board/subject-main/post-list/post-list.component';
import { PostComponent } from './student-social/main-board/subject-main/post-list/post/post.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "./material.module";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StudentSocialComponent,
    MenuComponent,
    MainBoardComponent,
    SubjectListComponent,
    SubjectMainComponent,
    SubjectComponent,
    CreatePostComponent,
    PostListComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgbModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MaterialModule
  ],
  providers: [
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
