import {NgModule} from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatCardModule} from "@angular/material/card";
// import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
// import {MatButtonModule} from "@angular/material/button";
// import {MatIconModule} from "@angular/material/icon";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatDialog} from "@angular/material/dialog";
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatRippleModule,
    MatSlideToggleModule
  ],
  exports:[
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatRippleModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
