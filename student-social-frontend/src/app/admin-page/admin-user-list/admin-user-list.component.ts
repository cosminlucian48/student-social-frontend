import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../services/request.service";
import {User} from "../../model/user";
import {RoleType} from "../../enums/role.type";

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  users: User[] = [];


  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.requestService.getUsers().subscribe(
      response =>{
        console.log("users")
        console.log(response)
        this.users = response;
      },
      ()=>{
        alert("Error when retrieving the list of users!.")
      }
    )
    // this.requestService.getUsersByUserType(RoleType.ADMIN).subscribe(
    //   response =>{
    //     console.log("users")
    //     console.log(response)
    //     this.users = response;
    //   },
    //   ()=>{
    //     alert("Error when retrieving the list of users!.")
    //   }
    // )
  }

  onUserListChanged() {
    this.getUsers();
  }
  addUser(){

  }

}
