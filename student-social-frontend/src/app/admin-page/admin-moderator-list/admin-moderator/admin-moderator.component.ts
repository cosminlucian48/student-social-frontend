import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/user";
import {RequestService} from "../../../services/request.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../../../services/authentication.service";
import {EditUserRoleComponent} from "../../admin-user-list/edit-user-role/edit-user-role.component";
import {EditModeratorDialogComponent} from "../edit-moderator-dialog/edit-moderator-dialog.component";

@Component({
  selector: 'app-admin-moderator',
  templateUrl: './admin-moderator.component.html',
  styleUrls: ['./admin-moderator.component.scss']
})
export class AdminModeratorComponent implements OnInit {

  @Input() moderator:User = new User("","","","","","","");

  isTheLoggedInUser: boolean = false;

  constructor(public requestService: RequestService, public dialog: MatDialog, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.moderator.email == this.authenticationService.getUserEmailFromToken()) {
      this.isTheLoggedInUser = true;
    }
  }

  editModeratorSubjects() {
    const dialogRef = this.dialog.open(EditModeratorDialogComponent, {
      data: {user: this.moderator}
    })
  }

}
