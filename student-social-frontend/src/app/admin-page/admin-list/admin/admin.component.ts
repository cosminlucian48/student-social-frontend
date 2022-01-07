import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/user";
import {RequestService} from "../../../services/request.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../../../services/authentication.service";
import {EditUserRoleComponent} from "../../admin-user-list/edit-user-role/edit-user-role.component";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Input() admin:User = new User("","","","","","","");
  @Output() userListChanged = new EventEmitter();
  isTheLoggedInUser: boolean = false;

  constructor(public requestService: RequestService, public dialog: MatDialog, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.admin.email == this.authenticationService.getUserEmailFromToken()) {
      this.isTheLoggedInUser = true;
    }
  }


}
