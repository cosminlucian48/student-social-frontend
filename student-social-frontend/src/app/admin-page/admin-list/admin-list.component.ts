import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {RequestService} from "../../services/request.service";
import {RoleType} from "../../enums/role.type";
import {CreateAdminDialogComponent} from "./create-admin-dialog/create-admin-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  admins: User[] = [];

  constructor(public requestService: RequestService, public dialog: MatDialog, public notifierService: NotifierService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.requestService.getUsersByUserType(RoleType.ADMIN).subscribe(
      response =>{
        console.log("users")
        console.log(response)
        this.admins = response;
      },
      ()=>{
        alert("Error when retrieving the list of users!.")
      }
    )
  }
  onUserListChanged() {
    this.getUsers();
  }

  addAdmin() {
    const dialogRef = this.dialog.open(CreateAdminDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

    })
  }

}
