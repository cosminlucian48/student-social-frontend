import {Component, Inject, Input, OnInit} from '@angular/core';
import {User} from "../../../../model/user";
import {AuthenticationService} from "../../../../services/authentication.service";
import {RequestService} from "../../../../services/request.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {RoleType} from "../../../../enums/role.type";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  subjectId: number = 1;
  users: User[] = [];

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
              public router: Router, public dialogRef: MatDialogRef<UserListComponent>, public notifier: NotifierService,
              @Inject(MAT_DIALOG_DATA) public data: { subjectId: number }) {
  }

  ngOnInit(): void {
    this.subjectId = this.data.subjectId;
    this.getUsersBySubject();
  }

  getUsersBySubject() {
    this.requestService.getUsersBySubject(this.subjectId).subscribe(response => {
      this.users = response;
    }, error => {
      this.notifier.notify('error', "Couldnt get users!");
    })
  }

  close(){
    this.dialogRef.close();
  }

  checkIfModerator(user: User){
    return (user.authorities==RoleType[RoleType.MODERATOR])
  }


}
