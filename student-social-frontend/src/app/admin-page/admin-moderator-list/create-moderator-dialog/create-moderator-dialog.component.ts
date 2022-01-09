import { Component, OnInit } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {AuthenticationService} from "../../../services/authentication.service";
import {RequestService} from "../../../services/request.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {User} from "../../../model/user";
import {RoleType} from "../../../enums/role.type";

@Component({
  selector: 'app-create-moderator-dialog',
  templateUrl: './create-moderator-dialog.component.html',
  styleUrls: ['./create-moderator-dialog.component.scss']
})
export class CreateModeratorDialogComponent implements OnInit {

  hide = true;
  private notifier: NotifierService;

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
  public router: Router, public dialogRef: MatDialogRef<CreateModeratorDialogComponent>, notifier: NotifierService) {
    this.notifier = notifier;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }


  ngOnInit(): void {
  }

  createModeratorSubmit(ngForm: NgForm) {
    if(ngForm.invalid){
      return;
    }
    const moderator = new User(ngForm.value.email,ngForm.value.password,ngForm.value.university, ngForm.value.firstName, ngForm.value.lastName,RoleType[RoleType.MODERATOR],ngForm.value.faculty);
    console.log(moderator);
    this.requestService.register(moderator).subscribe(responseDate =>{
      this.showNotification('success', 'Moderator added succesfully');
      this.close();
    },
      error => {
      alert("Something went wrong addding a moderator");
      })
  }
  close() {
    this.dialogRef.close();
  }
}
