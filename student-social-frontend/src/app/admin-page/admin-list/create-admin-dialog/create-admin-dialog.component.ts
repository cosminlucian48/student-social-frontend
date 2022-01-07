import { Component, OnInit } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {AuthenticationService} from "../../../services/authentication.service";
import {RequestService} from "../../../services/request.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {RoleType} from "../../../enums/role.type";
import {User} from "../../../model/user";

@Component({
  selector: 'app-create-admin-dialog',
  templateUrl: './create-admin-dialog.component.html',
  styleUrls: ['./create-admin-dialog.component.scss']
})
export class CreateAdminDialogComponent implements OnInit {

  private notifier: NotifierService;

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
              public router: Router, public dialogRef: MatDialogRef<CreateAdminDialogComponent>, notifier: NotifierService) {
    this.notifier = notifier;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngOnInit(): void {
  }

  createAdminSubmit(ngForm: NgForm) {
    if (ngForm.invalid){
      return;
    }
    const admin = new User(ngForm.value.email,ngForm.value.password,ngForm.value.university, ngForm.value.firstName, ngForm.value.lastName,RoleType[RoleType.ADMIN],ngForm.value.faculty);
    console.log(admin);
    this.requestService.register(admin).subscribe(responseData => {
      this.showNotification('success', 'Admin added succesfully');
      this.close();
    },
      error => {
      alert("Something went wrong adding an admin");
      })
  }
  close() {
    this.dialogRef.close();
  }
}

