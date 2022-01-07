import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {RequestService} from "../../services/request.service";
import {RoleType} from "../../enums/role.type";
import {CreateAdminDialogComponent} from "../admin-list/create-admin-dialog/create-admin-dialog.component";
import {CreateModeratorDialogComponent} from "./create-moderator-dialog/create-moderator-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-moderator-list',
  templateUrl: './admin-moderator-list.component.html',
  styleUrls: ['./admin-moderator-list.component.scss']
})
export class AdminModeratorListComponent implements OnInit {

  moderators: User[] = [];

  constructor(public requestService: RequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.requestService.getUsersByUserType(RoleType.MODERATOR).subscribe(
      response =>{
        console.log("users")
        console.log(response)
        this.moderators = response;
      },
      ()=>{
        alert("Error when retrieving the list of users!.")
      }
    )
  }

  onUserListChanged() {
    this.getUsers();
  }
  addModerator() {
    const dialogRef = this.dialog.open(CreateModeratorDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

    })
  }

}
