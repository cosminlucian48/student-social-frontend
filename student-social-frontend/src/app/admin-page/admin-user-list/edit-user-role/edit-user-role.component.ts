import {Component, Inject, Input, OnInit} from '@angular/core';
import {RoleType} from "../../../enums/role.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../model/user";
import {RequestService} from "../../../services/request.service";

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.scss']
})
export class EditUserRoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditUserRoleComponent>,
              public requestService: RequestService,
              @Inject(MAT_DIALOG_DATA) public data: { user: User }) {
  }

  roleTypes: String[] = [RoleType[RoleType.ADMIN], RoleType[RoleType.MODERATOR], RoleType[RoleType.USER]];
  selectedRole = this.data.user.authorities;

  userId: Number = 0;
  updatedUser:User = new User("", "", "", "", "", "","");

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.updatedUser = this.data.user;
    this.updatedUser.authorities = this.selectedRole;
    this.requestService.updateUser(this.updatedUser).subscribe(
      response => {
        console.log("OK");
      }
      ,
      () => {
        alert("Error at update user");
      }
    );
    this.dialogRef.close();
  }

}
