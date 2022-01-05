import {Component, Input, OnInit} from '@angular/core';
import {UserSettings} from "../../../model/user.settings";
import {User} from "../../../model/user";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../../register/register.component";
import {EditUserInfoComponent} from "./edit-user-info/edit-user-info.component";
import {ResetUserPasswordComponent} from "./reset-user-password/reset-user-password.component";
import {RequestService} from "../../../services/request.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {


  @Input() userSettings: UserSettings = new UserSettings();
  constructor(public dialog:MatDialog, public requestService:RequestService) { }

  ngOnInit(): void {

  }
  updateUserUi(){
    this.requestService.getUserSettingsByEmail(this.userSettings.user.email).subscribe(response=>{
      this.userSettings.user = response.user;
    },
      error => {
      alert("Error when updating edited user in ui!")
      })
  }


  editUserInfo(){
    const dialogRef = this.dialog.open(EditUserInfoComponent, {data:{user:this.userSettings.user}});

    dialogRef.afterClosed().subscribe(() => {
      this.updateUserUi();
      },
      error => {
        alert("Error at user register!")
      });
  }

  changeUserPassword(){
    const dialogRef = this.dialog.open(ResetUserPasswordComponent);

    dialogRef.afterClosed().subscribe(() => {
      },
      error => {
        alert("Error at user register!")
      });
  }

}
