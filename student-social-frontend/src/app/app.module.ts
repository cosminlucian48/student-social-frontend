import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import {fakeBackendProvider} from './_helpers';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StudentSocialComponent} from './student-social/student-social.component';
import {MenuComponent} from './student-social/menu/menu.component';
import {MainBoardComponent} from './student-social/main-board/main-board.component';
import {SubjectListComponent} from './student-social/main-board/subject-list/subject-list.component';
import {SubjectMainComponent} from './student-social/main-board/subject-main/subject-main.component';
import {SubjectComponent} from './student-social/main-board/subject-list/subject/subject.component';
import {CreatePostComponent} from './student-social/main-board/subject-main/create-post/create-post.component';
import {PostListComponent} from './student-social/main-board/subject-main/post-list/post-list.component';
import {PostComponent} from './student-social/main-board/subject-main/post-list/post/post.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SecurityRequestInterceptor } from './security.request.interceptor';
import {MatDialogModule} from "@angular/material/dialog";

import {MaterialModule} from "./material.module";
import {AuthenticationService} from "./services/authentication.service";
import {UrlService} from "./services/url.service";
import {LocalStorageService} from "./services/local.storage.service";
import {JWTTokenService} from "./services/jwt.token.service";
import {AuthorizeGuard} from "./services/authorize.guard";
import {RequestService} from "./services/request.service";
import {SubjectService} from "./services/subject.service";
import {DatePipe} from "@angular/common";
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminTabComponent } from './admin-page/admin-tab/admin-tab.component';
import { AdminSubjectListComponent } from './admin-page/admin-subject-list/admin-subject-list.component';
import { AddSubjectComponent } from './admin-page/add-subject/add-subject.component';



/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


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
    PostComponent,
    AdminPageComponent,
    AdminTabComponent,
    AdminSubjectListComponent,
    AddSubjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    MatDialogModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SecurityRequestInterceptor, multi: true},
    AuthenticationService,
    UrlService,
    LocalStorageService,
    JWTTokenService,
    AuthorizeGuard,
    RequestService,
    SubjectService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
