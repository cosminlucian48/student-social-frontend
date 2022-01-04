import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/user";
import {RequestService} from "../../../services/request.service";
import {RoleType} from "../../../enums/role.type";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../../register/register.component";
import {EditUserRoleComponent} from "../edit-user-role/edit-user-role.component";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  @Input() user:User = new User("","","","","","","");
  @Output() userListChanged = new EventEmitter();
  isTheLoggedInUser: boolean = false;

  constructor(public requestService: RequestService, public dialog:MatDialog,public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.user.email == this.authenticationService.getUserFromToken()){
      this.isTheLoggedInUser = true;
    }
  }

  editUserAuthorities(){
    const dialogRef = this.dialog.open(EditUserRoleComponent,{
      data: {user: this.user}
    });
  }


}
